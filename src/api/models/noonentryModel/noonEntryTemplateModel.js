const pool = require("../../../config/config");

const createNoonEntryTemplate=async()=>{
    const query=`create table noonEntryTemplateData

        (
            template_id serial primary key,
            template_type  varchar,
            template_data json,
            vessel_names varchar,
            created_by varchar,
            isdefault BOOLEAN NOT NULL
           
             )`

   await pool.query(query).then(res=>{
    console.log("Table created successfully")
   }).catch((erro)=>{
    // console.log(erro)
   })
}
module.exports={
    createNoonEntryTemplate:createNoonEntryTemplate
}