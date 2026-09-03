const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "portfolio.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Błąd połączenia z bazą:", err.message);
    } else {
        console.log("Połączono z bazą SQLite.");
    }
});

module.exports = db;