import * as SQLite from 'expo-sqlite';

let banco;

export async function conectarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('tarefas.db');
    await banco.execAsync(`PRAGMA journal_mode = WAL`);
  }
  return banco;
}

export async function criarTabela() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL
    );
  `);
}

export async function adicionarTarefa(titulo) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO tarefas (titulo) VALUES (?);',
    titulo
  );
  return resultado.lastInsertRowId;
}

export async function listarTarefas() {
  const db = await conectarBanco();
  const tarefas = await db.getAllAsync('SELECT * FROM tarefas;');
  return tarefas;
}

export async function atualizarTarefa(id, novoTitulo) {
  const db = await conectarBanco();
  await db.runAsync(
    'UPDATE tarefas SET titulo = ? WHERE id = ?;',
    novoTitulo,
    id
  );
}

export async function deletarTarefa(id) {
  const db = await conectarBanco();
  await db.runAsync(
    'DELETE FROM tarefas WHERE id = ?;',
    id
  );
}
