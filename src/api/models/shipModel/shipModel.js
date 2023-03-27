const pool = require("../../../config/config");

const createShipTable=async()=>{
    const query=`create table noonships
        (
            vesselid serial primary key,
            mapping_name  varchar,
            shipname varchar,
            company_name varchar,
            created_date date, 
            register_by varchar,
            category varchar,
            registered_country varchar
             )`

   await pool.query(query).then(res=>{
    console.log("Table created successfully")
   }).catch((erro)=>{
    // console.log(erro)
   })
}
module.exports={
    createShipTable:createShipTable
}