type ArgValue = string | number | null;

function tursoUrl() {
  return (process.env.TURSO_URL ?? '').replace(/^libsql:\/\//, 'https://');
}
function tursoToken() {
  return process.env.TURSO_TOKEN ?? '';
}

async function pipeline(requests: object[]): Promise<unknown[]> {
  const res = await fetch(`${tursoUrl()}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tursoToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests: [...requests, { type: 'close' }] }),
  });
  if (!res.ok) throw new Error(`Turso HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json() as { results: { type: string; response?: { result?: { cols: {name:string}[]; rows: {type:string;value:unknown}[][] } }; error?: {message:string} }[] };
  return json.results.map(r => {
    if (r.type === 'error') throw new Error(r.error?.message ?? 'unknown turso error');
    const result = r.response?.result;
    if (!result) return [];
    const cols = result.cols.map(c => c.name);
    return result.rows.map(row => {
      const obj: Record<string, unknown> = {};
      cols.forEach((col, i) => { obj[col] = row[i]?.value ?? null; });
      return obj;
    });
  });
}

function toArg(v: ArgValue) {
  if (v === null) return { type: 'null' };
  if (typeof v === 'number') return Number.isInteger(v) ? { type: 'integer', value: String(v) } : { type: 'float', value: v };
  return { type: 'text', value: v };
}

export function getDb() {
  return async function db(strings: TemplateStringsArray, ...values: ArgValue[]) {
    let sql = '';
    strings.forEach((s, i) => { sql += s; if (i < values.length) sql += '?'; });
    const [rows] = await pipeline([{ type: 'execute', stmt: { sql, args: values.map(toArg) } }]);
    return rows as Record<string, unknown>[];
  };
}

const SCHEMA_STMTS = [
  `CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, name TEXT, is_public INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS participants (room_id TEXT NOT NULL, name TEXT NOT NULL, lat REAL NOT NULL DEFAULT 0, lng REAL NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT (datetime('now')), PRIMARY KEY (room_id, name))`,
  `CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, room_id TEXT NOT NULL, name TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS signals (id INTEGER PRIMARY KEY AUTOINCREMENT, room_id TEXT NOT NULL, from_name TEXT NOT NULL, to_name TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS destination (room_id TEXT PRIMARY KEY, lat REAL NOT NULL, lng REAL NOT NULL, label TEXT NOT NULL DEFAULT '目的地', updated_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS avatars (name TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, room_id TEXT NOT NULL, from_name TEXT NOT NULL, url TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`,
  `CREATE INDEX IF NOT EXISTS idx_photos_room ON photos(room_id, id DESC)`,
];

let schemaPromise: Promise<void> | null = null;
export function ensureMigrated(): Promise<void> {
  if (schemaPromise) return schemaPromise;
  schemaPromise = pipeline(SCHEMA_STMTS.map(sql => ({ type: 'execute', stmt: { sql, args: [] } })))
    .then(() => {})
    .catch(err => { schemaPromise = null; throw err; });
  return schemaPromise;
}
