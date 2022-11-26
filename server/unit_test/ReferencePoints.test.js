const refPts = require('../modules/ReferencePoints');
const HikeRefPoints =require('../modules/HikeRefPoints');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyHikeRefPoint();
   },db.timeout  
)
afterAll(async()=>{
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyHikeRefPoint(); 
},db.timeout )

describe("get/Add reference points",()=>{
    beforeEach(async() =>{   
        
        await refPts.emptyReferencePoint();
        await HikeRefPoints.emptyHikeRefPoint();
       },db.timeout  
    )
    afterEach(async()=>{
        await refPts.emptyReferencePoint();
        await HikeRefPoints.emptyHikeRefPoint(); 
    },db.timeout )

    it("get form an empty list",async()=>{
        await expect(refPts.getStartingPoints()).resolves.toEqual([]);
        await expect(refPts.getFromType()).resolves.toEqual([]);
    });

    describe("starting point point",()=>{
        it("add a SP",async()=>{
            await expect(refPts.getStartingPoints()).resolves.toEqual([]);
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await HikeRefPoints.addHikeRefPoints(0,0,1,0);
            await expect(refPts.addReferencePoint(0,0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getStartingPoints()).resolves.not.toEqual([]);
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
        });

    });
    describe("Update Reference Point",()=>{
        beforeEach(async() =>{   
            await refPts.emptyReferencePoint();
           })
        it("add a RP",async()=>{
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.addReferencePoint(0,0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
            let RP= await refPts.getFromType("type");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual("0");
            
        });
        it("Update a RP",async()=>{
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.addReferencePoint(0,0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
            let RP= await refPts.getFromType("type");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual("0");
            await expect(refPts.updateReferencePoint(0,1,1,"otherType")).resolves.toEqual('Entry updated');
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.getFromType("otherType")).resolves.not.toEqual([]);
            RP= await refPts.getFromType("otherType");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual("0");
        });
        it("Update a RP that doesnt exist",async()=>{

            await expect(refPts.updateReferencePoint('n',1,1,"otherType")).resolves.toEqual('Entry updated');
            
        });
        
       

    });

});