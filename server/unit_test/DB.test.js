const db = require("../modules/DB");
const hikesLoc =require("../modules/HikeLocations");
const hikes =require("../modules/Hikes");
const Files= require("../modules/FileNames");
const totalEntries= 3;
describe("Get/add HikeLocations",()=>{
  
    test('Populate DB',async()=>{
        await db.createConnection();
        await db.populateHikes();
        let HL= await hikes.getHikes();
        let HikeList = await hikesLoc.getHikeLocations();
        let files=await Files.getFiles();
        // console.log(HL);
        // console.log(HikeList);
        expect(HikeList).toHaveLength(totalEntries);
        expect(files).toHaveLength(totalEntries);
        expect(HL).toHaveLength(totalEntries);
      
    });
    

});