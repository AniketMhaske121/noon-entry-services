const pool = require("../../../config/config");
const db = require("../../../config/config");

const createShipTable=async()=>{
    const query = `CREATE TABLE IF NOT EXISTS noonships
                     (
                        vesselid INTEGER PRIMARY KEY AUTOINCREMENT,
                        mapping_name  TEXT type UNIQUE,
                        shipname TEXT,
                        company_name TEXT,
                        created_date TEXT, 
                        register_by TEXT,
                        category TEX,
                        registered_country TEXT
                    )`;
      db.run(query,[],(err)=>{if(err) return console.error(err)})
 }
module.exports={
    createShipTable:createShipTable
}