const db = require("../modules/DB");
const hikesLoc =require("../modules/HikeLocations");
const hikes =require("../modules/Hikes");
const Files= require("../modules/FileNames");
const totalEntries= 4;

beforeAll(async()=>{
    await db.createConnection();
    await db.populateHikes();
})
describe("Get/add HikeLocations",()=>{
  
    test('Populate DB Hikes',async()=>{
        
        let HL= await hikes.getHikes();
        // let HikeList = await hikesLoc.getHikeLocations();
        // let files=await Files.getFiles();
        // console.log(HL);
        // console.log(HikeList);
       // expect(HikeList).toHaveLength(totalEntries);
        //expect(files).toHaveLength(totalEntries);
        expect(HL.length).toBeGreaterThan(totalEntries);
      
    });
    test('Populate DB Locations',async()=>{
        // await db.createConnection();
        // await db.populateHikes();
        // let HL= await hikes.getHikes();
        let HikeList = await hikesLoc.getHikeLocations();
        // let files=await Files.getFiles();
        // console.log(HL);
        // console.log(HikeList);
       expect(HikeList.length).toBeGreaterThan(totalEntries);
        //expect(files).toHaveLength(totalEntries);
        // expect(HL).toHaveLength(totalEntries);
      
    });
    test('Populate DB Files',async()=>{
        // await db.createConnection();
        // await db.populateHikes();
        // let HL= await hikes.getHikes();
        // let HikeList = await hikesLoc.getHikeLocations();
        let files=await Files.getFiles();
        // console.log(HL);
        // console.log(HikeList);
       // expect(HikeList).toHaveLength(totalEntries);
        expect(files.length).toBeGreaterThan(totalEntries);
        //expect(HL).toHaveLength(totalEntries);
      
    });
    

});