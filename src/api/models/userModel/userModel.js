const pool = require('../../../config/config');

const createUserTable=async()=>{
    const query=`create table users
        (
            id serial primary key,
            email varchar,
            name varchar,
            phonenumber varchar,
            password varchar
             )`

   await pool.query(query).then(res=>{
    console.log("Table created successfully")
   }).catch((erro)=>{
    // console.log(erro)
   })
        
    
 
  
}
module.exports={
    createUserTable:createUserTable
}