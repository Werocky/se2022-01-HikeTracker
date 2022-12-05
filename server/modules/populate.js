const db = require("../modules/DB");

module.exports= {
    populateScript: async()=>{
        await db.createConnection();
        await db.populate();
    }, 
    dropTablesScript:async()=>{
        await db.dropTables();
    }, 
    createConnection:async()=>{
        await db.createConnection();
    },   
}