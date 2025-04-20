import Database from "better-sqlite3";
import path from "path";

// Initialize database
const db = new Database(path.join(__dirname, "../logentries.db"));

// Create table if it doesn't exist
db.exec(`
CREATE TABLE IF NOT EXISTS log_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;