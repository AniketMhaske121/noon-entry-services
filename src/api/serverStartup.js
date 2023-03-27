const createUserTable=require("./models/userModel/userModel")
const createShipTable=require("./models/shipModel/shipModel")
const createTables=async()=>{
createUserTable.createUserTable()
createShipTable.createShipTable()
}
module.exports={
    createTables:createTables
} 