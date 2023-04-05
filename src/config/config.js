const Pool = require('pg').Pool;
const sqlite3 = require("sqlite3")
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: "noon-report-db",
    host: 'localhost',
    port: 5432
});
module.exports = pool;

const db = new sqlite3.Database("noon-report.db", (err) => {
    if(err) return console.error(err.message)
});

module.exports = db;