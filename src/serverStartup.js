const createUserTable=require("./api/models/userModel/userModel")
const createShipTable=require("./api/models/shipModel/shipModel")
const createNoonEntryTemplate=require("./api/models/noonentryModel/noonEntryTemplateModel")
const createTables=async()=>{
createUserTable.createUserTable()
createShipTable.createShipTable()
createNoonEntryTemplate.createNoonEntryTemplate()
}
module.exports={
    createTables:createTables
} 