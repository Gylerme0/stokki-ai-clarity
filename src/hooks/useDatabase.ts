import { useState, useEffect } from 'react';
import initSqlJs, { Database } from 'sql.js';

let dbInstance: Database | null = null;
let isInitializing = false;
let initPromise: Promise<Database> | null = null;

const initDB = async (): Promise<Database> => {
  if (dbInstance) return dbInstance;
  
  if (isInitializing && initPromise) {
    return initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    });

    // Try to load existing database from localStorage
    const savedDb = localStorage.getItem('sqliteDb');
    if (savedDb) {
      const uint8Array = new Uint8Array(JSON.parse(savedDb));
      dbInstance = new SQL.Database(uint8Array);
    } else {
      dbInstance = new SQL.Database();
      
      // Create tables
      dbInstance.run(`
        CREATE TABLE IF NOT EXISTS categorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT
        );

        CREATE TABLE IF NOT EXISTS unidades (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT
        );

        CREATE TABLE IF NOT EXISTS fornecedores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          razao_social TEXT NOT NULL,
          cnpj TEXT NOT NULL,
          telefone TEXT,
          email TEXT,
          endereco TEXT
        );

        CREATE TABLE IF NOT EXISTS enderecos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL,
          type TEXT NOT NULL,
          capacity INTEGER NOT NULL,
          occupied INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS materiais (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sku TEXT NOT NULL,
          description TEXT NOT NULL,
          category TEXT NOT NULL,
          stock INTEGER DEFAULT 0,
          unit TEXT NOT NULL,
          supplier TEXT,
          picking_address TEXT
        );
      `);

      // Insert initial mock data
      dbInstance.run(`
        INSERT INTO categorias (name, description) VALUES
          ('Fixação', 'Parafusos, porcas, arruelas'),
          ('Ferramentas', 'Ferramentas manuais e elétricas'),
          ('Elétrica', 'Componentes elétricos');

        INSERT INTO unidades (code, name, description) VALUES
          ('UN', 'Unidade', 'Unidade individual'),
          ('KG', 'Quilograma', 'Medida de peso'),
          ('M', 'Metro', 'Medida de comprimento');

        INSERT INTO fornecedores (razao_social, cnpj, telefone, email) VALUES
          ('Fornecedor ABC Ltda', '12.345.678/0001-90', '(11) 1234-5678', 'contato@abc.com'),
          ('Distribuidora XYZ S.A.', '98.765.432/0001-10', '(11) 8765-4321', 'vendas@xyz.com');

        INSERT INTO enderecos (code, type, capacity, occupied) VALUES
          ('A01-01-01', 'Prateleira', 100, 45),
          ('A01-01-02', 'Prateleira', 100, 78),
          ('B02-03-01', 'Rack', 500, 320);

        INSERT INTO materiais (sku, description, category, stock, unit, supplier, picking_address) VALUES
          ('MAT-001', 'Parafuso M8x20mm', 'Fixação', 1500, 'UN', 'Fornecedor ABC Ltda', 'A01-01-01'),
          ('MAT-002', 'Chave Philips 6"', 'Ferramentas', 25, 'UN', 'Distribuidora XYZ S.A.', 'A01-01-02'),
          ('MAT-003', 'Cabo Elétrico 2.5mm', 'Elétrica', 500, 'M', 'Fornecedor ABC Ltda', 'B02-03-01');
      `);

      saveDB();
    }

    isInitializing = false;
    return dbInstance;
  })();

  return initPromise;
};

const saveDB = () => {
  if (dbInstance) {
    const data = dbInstance.export();
    const buffer = Array.from(data);
    localStorage.setItem('sqliteDb', JSON.stringify(buffer));
  }
};

export const useDatabase = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB().then((database) => {
      setDb(database);
      setLoading(false);
    });
  }, []);

  const executeQuery = (query: string, params?: any[]) => {
    if (!db) throw new Error('Database not initialized');
    const stmt = db.prepare(query);
    if (params) stmt.bind(params);
    const results: any[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    saveDB();
    return results;
  };

  const executeUpdate = (query: string, params?: any[]) => {
    if (!db) throw new Error('Database not initialized');
    db.run(query, params);
    saveDB();
  };

  return { db, loading, executeQuery, executeUpdate };
};
