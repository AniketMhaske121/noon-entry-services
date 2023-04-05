const db = require("../../../config/config");

const createNoonEntryTemplate=async()=>{
    const query=`CREATE TABLE IF NOT EXISTS noonEntryTemplateData

        (
            template_id INTEGER PRIMARY KEY AUTOINCREMENT,
            template_type  TEXT,
            template_data TEXT,
            vessel_names TEXT,
            created_by TEXT,
            isdefault TEXT
           
             )`

    db.run(query,[],(err)=>{if(err) return console.error(err)})
}
module.exports={
    createNoonEntryTemplate:createNoonEntryTemplate
}