import { createClient, type InValue } from '@libsql/client';

function createDb() {
  const client = createClient({
    url: (process.env.TURSO_URL ?? ''),
    authToken: process.env.TURSO_TOKEN ?? '',
  });

  return async function db(strings: TemplateStringsArray, ...values: InValue[]) {
    let sql = '';
    strings.forEach((s, i) => {
      sql += s;
      if (i < values.length) sql += '?';
    });
    const result = await client.execute({ sql, args: values });
    return result.rows as unknown as Record<string, unknown>[];
  };
}

export function getDb() {
  return createDb();
}

let schemaPromise: Promise<void> | null = null;

export function ensureMigrated(): Promise<void> {
  if (schemaPromise) return schemaPromise;
  const client = createClient({
    url: (process.env.TURSO_URL ?? ''),
    authToken: process.env.TURSO_TOKEN ?? '',
  });
  schemaPromise = client.batch([
    { sql: `CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      name TEXT,
      is_public INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS participants (
      room_id TEXT NOT NULL,
      name TEXT NOT NULL,
      lat REAL NOT NULL DEFAULT 0,
      lng REAL NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (room_id, name)
    )`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id TEXT NOT NULL,
      name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS signals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id TEXT NOT NULL,
      from_name TEXT NOT NULL,
      to_name TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS destination (
      room_id TEXT PRIMARY KEY,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      label TEXT NOT NULL DEFAULT '目的地',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS avatars (
      name TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },
  ], 'write').then(() => {}).catch(err => { schemaPromise = null; throw err; });
  return schemaPromise;
}
