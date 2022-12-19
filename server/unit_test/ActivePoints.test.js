const db = require("../modules/DB");

const ActivePoint= require("../modules/ActiveHike");
const H =require("../modules/Hikes");
const{hike}=require("../modules/Hikes");
const RP =require("../modules/ReferencePoints");
const HRP= require("../modules/HikeRefPoints");



beforeAll(async()=>{
    await db.createConnection();
    await H.deleteHikes();
    await HRP.emptyAllPoints();
    let h= new hike(1,'title',0,0,0,0,0,0,0,0,0,0,0,0,0,null);
    await H.addHike(h);
    await RP.emptyReferencePoint();
    await RP.addReferencePoint(1,1,'hut');
    
    await HRP.addHikeRefPoints(1,1,0,0);
    await ActivePoint.emptyConnection();
},db.timeout)
afterAll(async()=>{
    await ActivePoint.emptyConnection();
},db.timeout)

describe("add an active point",()=>{
    it("get empty table",async()=>{
        let answer= await ActivePoint.getActivePoints()
        await  expect(ActivePoint.getActivePoints()).resolves.not.toEqual(null);
        await  expect(ActivePoint.getActivePoints()).resolves.toEqual([]);
    })
    it("Pass an Active point",async()=>{
        let time=new Date();
        let timestamp=time.getTime();

    await expect(ActivePoint.RegisterActivePoint(1,"a@polito.it",1,1)).resolves.toEqual('ActivePoint Saved');
    
    let AP= await ActivePoint.getActivePoints();

    expect(AP).toHaveLength(1);
    AP=AP[0];
    expect(AP).toHaveProperty('HikeID');
    expect(AP.HikeID).toEqual(1);
    expect(AP).toHaveProperty('HikerID');
    expect(AP.HikerID).toEqual("a@polito.it");
    expect(AP).toHaveProperty('PointID');
    expect(AP.PointID).toEqual(1);
    expect(AP).toHaveProperty('ArrivalTime');
    expect(AP.ArrivalTime).toBeGreaterThanOrEqual(timestamp);
    
    })
    it("add a second Point",async()=>{
        await expect(ActivePoint.RegisterActivePoint(1,"a@polito.it",1,2)).resolves.toEqual('ActivePoint Saved');
        let AP= await ActivePoint.getActivePoints();

        expect(AP).toHaveLength(2);


    })
    describe("get next active Hike",()=>{
        it("get next active Hike",async()=>{
            await expect(ActivePoint.getNextActiveHike()).resolves.toEqual(3);
        })
        it("get next active Hike empty list",async()=>{
            await ActivePoint.emptyConnection();
            await expect(ActivePoint.getNextActiveHike()).resolves.toEqual(1);
        })
    })
    
});