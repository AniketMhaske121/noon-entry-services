const db = require("../../../config/config");

const createUserTable=async()=>{
    const query=`CREATE TABLE IF NOT EXISTS users
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT type UNIQUE,
            name TEXT,
            phonenumber TEXT,
            password TEXT
             )`

   db.run(query,[],(err)=>{if(err) return console.error(err)})
  
}
module.exports={
    createUserTable:createUserTable
}