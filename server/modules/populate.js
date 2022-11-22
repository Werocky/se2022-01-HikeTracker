const db = require("../modules/DB");

module.exports= {
    populateScript: async()=>{
        await db.createConnection();
        await db.populate();
    },    
}