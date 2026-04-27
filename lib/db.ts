import { neon } from '@neondatabase/serverless';

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

let migrationPromise: Promise<void> | null = null;

export function ensureMigrated(): Promise<void> {
  if (!migrationPromise) {
    const db = getDb();
    migrationPromise = (async () => {
      await db`ALTER TABLE rooms ADD COLUMN IF NOT EXISTS name VARCHAR(50)`;
      await db`ALTER TABLE rooms ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE`;
    })().catch(err => { migrationPromise = null; throw err; });
  }
  return migrationPromise;
}
