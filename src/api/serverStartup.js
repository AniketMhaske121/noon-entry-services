const createUserTable=require("./models/userModel/userModel")

const createTables=async()=>{
createUserTable.createUserTable()
}
module.exports={
    createTables:createTables
} 