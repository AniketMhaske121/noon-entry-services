const Pool=require('pg').Pool;
const pool=new Pool({
    user:'postgres',
    password:'postgres',
    database:"local_orion_db",
    host:'localhost',
    port:5432
});
module.exports=pool;
