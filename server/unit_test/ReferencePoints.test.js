const refPts = require('../modules/ReferencePoints');
const HikeRefPoints =require('../modules/HikeRefPoints');
const h=require('../modules/Hikes')
const db = require("../modules/DB");



beforeAll(async() =>{   
    await db.createConnection();
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyAllPoints();
   },db.timeout  
)
afterAll(async()=>{
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyHikeRefPoint(); 
},db.timeout )


beforeEach(async() =>{   
        
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyHikeRefPoint();
    await h.deleteHikes()
   },db.timeout  
)
afterEach(async()=>{
    await refPts.emptyReferencePoint();
    await HikeRefPoints.emptyHikeRefPoint(); 
    await h.deleteHikes()
},db.timeout )

describe("get/Add reference points",()=>{
    beforeEach(async() =>{   
        
        await refPts.emptyReferencePoint();
        await HikeRefPoints.emptyHikeRefPoint();
        await h.deleteHikes()
        },db.timeout  
    )
    afterEach(async()=>{
        await refPts.emptyReferencePoint();
        await HikeRefPoints.emptyHikeRefPoint(); 
        await h.deleteHikes()
    },db.timeout )

    it("get form an empty list",async()=>{
        await expect(refPts.getStartingPoints()).resolves.toEqual([]);
        await expect(refPts.getFromType()).resolves.toEqual([]);
    });

    describe("starting point point",()=>{
        it("add a SP",async()=>{
            await expect(refPts.getStartingPoints()).resolves.toEqual([]);
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await HikeRefPoints.addHikeRefPoints(1,1,1,0);
            await expect(refPts.addReferencePoint(0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getStartingPoints()).resolves.not.toEqual([]);
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
        });

    });
    describe("Update Reference Point",()=>{
        beforeEach(async() =>{   
            await refPts.emptyReferencePoint();
        })

        it("add a RP with description",async()=>{
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.addReferencePointWithDescription('a description',0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
            let RP= await refPts.getFromType("type");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual(1);
            
        });
        it("add a RP",async()=>{
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.addReferencePoint(0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
            let RP= await refPts.getFromType("type");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual(1);
            
        });
        it("Update a RP",async()=>{
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.addReferencePoint(0,0,"type")).resolves.toEqual("New RefPoint added");
            await expect(refPts.getFromType("type")).resolves.not.toEqual([]);
            let RP= await refPts.getFromType("type");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual(1);
            await expect(refPts.updateReferencePoint(1,1,1,"otherType")).resolves.toEqual('Entry updated');
            await expect(refPts.getFromType("type")).resolves.toEqual([]);
            await expect(refPts.getFromType("otherType")).resolves.not.toEqual([]);
            RP= await refPts.getFromType("otherType");
            expect(RP).toHaveLength(1);
            expect(RP[0]).toHaveProperty('RefPointID');
            expect(RP[0].RefPointID).toEqual(1);
        });
        it("Update a RP that doesnt exist",async()=>{

            await expect(refPts.updateReferencePoint('n',1,1,"otherType")).resolves.toEqual('Entry updated');
            
        });
    
    });

    it("Get HikeInfo", async()=>{
        

        await refPts.addReferencePoint(1,1,"hut");
        await expect(refPts.getFromType("hut")).resolves.not.toEqual([]);

        await expect(refPts.getLastRefPointID()).resolves.not.toEqual(null);
        let n = await refPts.getLastRefPointID();
        expect(n).toEqual(1);
        await h.addHike(1,1,1,1,1,1,1,1,1);
        await expect(HikeRefPoints.addHikeRefPoints(1,1,0,0)).resolves.not.toEqual(null);
        await expect(HikeRefPoints.getHikeInfo(1)).resolves.not.toEqual([]);
        let rfp=  await HikeRefPoints.getHikeInfo(1);
        expect(rfp).toHaveLength(1)
        expect(rfp[0]).toHaveProperty('HikeID')
        expect(rfp[0].HikeID).toEqual(1)
        expect(rfp[0]).toHaveProperty('RefPointID')
        expect(rfp[0].RefPointID).toEqual(1)
        expect(rfp[0]).toHaveProperty('IsEnd')
        expect(rfp[0].IsEnd).toEqual(0)
        expect(rfp[0]).toHaveProperty('IsStart')
        expect(rfp[0].IsStart).toEqual(0)
    })



    it("set start/ end", async()=>{
        

        await refPts.addReferencePoint(1,1,"hut");
        await expect(refPts.getFromType("hut")).resolves.not.toEqual([]);

        await expect(refPts.getLastRefPointID()).resolves.not.toEqual(null);
        let n = await refPts.getLastRefPointID();
        expect(parseInt(n)).toEqual(1);
        await h.addHike(1,1,1,1,1,1,1,1,1);
        await expect(HikeRefPoints.addHikeRefPoints(1,1,0,0)).resolves.not.toEqual(null);
        await expect(HikeRefPoints.getHikeInfo(1)).resolves.not.toEqual([]);
        let rfp=  await HikeRefPoints.getHikeInfo(1);
        
        expect(rfp).toHaveLength(1)
        expect(rfp[0]).toHaveProperty('HikeID')
        expect(rfp[0].HikeID).toEqual(1)
        expect(rfp[0]).toHaveProperty('RefPointID')
        expect(rfp[0].RefPointID).toEqual(1)
        expect(rfp[0]).toHaveProperty('IsEnd')
        expect(rfp[0].IsEnd).toEqual(0)
        expect(rfp[0]).toHaveProperty('IsStart')
        expect(rfp[0].IsStart).toEqual(0)

        await expect(HikeRefPoints.setIsEnd(1,1,1)).resolves.toEqual('Is End setted')
        await expect(HikeRefPoints.setIsStart(1,1,1)).resolves.toEqual('Is Start setted')
        rfp=  await HikeRefPoints.getHikeInfo(1);
        
        expect(rfp).toHaveLength(1)
        expect(rfp[0]).toHaveProperty('HikeID')
        expect(rfp[0].HikeID).toEqual(1)
        expect(rfp[0]).toHaveProperty('RefPointID')
        expect(rfp[0].RefPointID).toEqual(1)
        expect(rfp[0]).toHaveProperty('IsEnd')
        expect(rfp[0].IsEnd).toEqual(1)
        expect(rfp[0]).toHaveProperty('IsStart')
        expect(rfp[0].IsStart).toEqual(1)
    
    
    })



});
it("Parks and Huts",async()=>{
    await expect(HikeRefPoints.emptyAllPoints());
    await expect(HikeRefPoints.getHutsAndParks()).resolves.toEqual([]);
})

describe("add connections form external modules",()=>{
    const PL=  require("../modules/ParkingLot").connectParkingToHike;
    const AddInHikes= require("../modules/Hikes").addHutToHike;
    const AddInHuts= require("../modules/Huts").addHutToHike;
    const H=  require("../modules/Hikes").addHike;
    const {hike}= require("../modules/Hikes");
    const P=  require("../modules/ReferencePoints").addReferencePoint;
    beforeEach(async()=>{
        await HikeRefPoints.emptyAllPoints();
        let h1= new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,0,null);
        await H(h1);
        await P(0,0,"type");
    })
    
    test("add  parking lot to a Hike",async()=>{


        await expect(HikeRefPoints.getHikeInfo(1)).resolves.toEqual([]);
    
        await expect(PL(1,1)).resolves.toEqual("New HikeRefPoint added");
    
        let hrp =await HikeRefPoints.getHikeInfo(1);
        
        expect(hrp).toHaveLength(1);
        expect(hrp[0]).toHaveProperty('HikeID');
        expect(hrp[0]).toHaveProperty('RefPointID');
        expect(hrp[0].HikeID).toEqual(1);
        expect(hrp[0].RefPointID).toEqual(1);
    
    });

    test("add Hut to a Hike from Huts",async()=>{

        await expect(HikeRefPoints.getHikeInfo(1)).resolves.toEqual([]);
    
        await expect(AddInHuts(1,1)).resolves.toEqual("New HikeRefPoint added");
        //for getting points of a hike is neccessay to have a hike and a Hike and a RP

        await expect(HikeRefPoints.getHikeInfo(1)).resolves.not.toEqual([]);
        
        let hrp =await HikeRefPoints.getHikeInfo(1);
        
        expect(hrp).toHaveLength(1);
        expect(hrp[0]).toHaveProperty('HikeID');
        expect(hrp[0]).toHaveProperty('RefPointID');
        expect(hrp[0].HikeID).toEqual(1);
        expect(hrp[0].RefPointID).toEqual(1);
    
    });
    test("add Hut to a Hike from Hikes",async()=>{

        await expect(HikeRefPoints.getHikeInfo(1)).resolves.toEqual([]);
    
        await expect(AddInHikes(1,1)).resolves.toEqual("New HikeRefPoint added");
        //for getting points of a hike is neccessay to have a hike and a Hike and a RP

        await expect(HikeRefPoints.getHikeInfo(1)).resolves.not.toEqual([]);
    
        let hrp =await HikeRefPoints.getHikeInfo(1);
        
        expect(hrp).toHaveLength(1);
        expect(hrp[0]).toHaveProperty('HikeID');
        expect(hrp[0]).toHaveProperty('RefPointID');
        expect(hrp[0].HikeID).toEqual(1);
        expect(hrp[0].RefPointID).toEqual(1);
    
    });
})

test("Get all reference points",async()=>{
    for (let i = 0; i < 4; i++) {
        await refPts.addReferencePoint(i,i%2,i%2? null:'Hut');
    }

    await expect(refPts.getAllRefPoints()).resolves.not.toEqual([]);
    let rps= await refPts.getAllRefPoints();
    expect(rps).toHaveLength(4);

})

test("Get Huts and parkings",async()=>{
    const huts=require("../modules/Huts");
    const {Hut}=require("../modules/Huts");
    huts.emptyHuts();
    const pl=require("../modules/ParkingLot");
    const {ParkingLot}=require("../modules/ParkingLot");
    pl.emptyParkingLot();

    for (let i = 0; i < 4; i++) {
        await refPts.addReferencePoint(i,i%2,i%2? 'parking':'hut');
        if(i%2){
            pl.createParkingLot(new ParkingLot(i+1,1,1,1));
        }else{
            huts.addHut(new Hut(i+1,"Name"+i,1,1,1,1,1));
        }
    }
    await refPts.addReferencePoint(5,5);

    await expect(refPts.getAllRefPoints()).resolves.not.toEqual([]);
    let rps= await refPts.getAllRefPoints();
    expect(rps).toHaveLength(5);

    await expect(refPts.getHutsAndParkingLots()).resolves.not.toEqual([]);
    rps= await refPts.getHutsAndParkingLots();
    expect(rps).toHaveLength(4);


})

describe("Is Last referencePoit",()=>{
    const H=  require("../modules/Hikes").addHike;
    const {hike}= require("../modules/Hikes");
    const P=  require("../modules/ReferencePoints").addReferencePoint;
    beforeEach(async()=>{
        await h.deleteHikes();
        await refPts.emptyReferencePoint();
        await H(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,0,null));
        await refPts.addReferencePoint(0,0,"no type");
        await refPts.addReferencePoint(0,1,"no type2");
        await HikeRefPoints.addHikeRefPoints(1,1,1,0);
        await HikeRefPoints.addHikeRefPoints(1,2,0,1);
    });
    
    it("is Ending point",async()=>{
        await expect(HikeRefPoints.IsLastPoint(1,2)).resolves.toEqual(true);

    })
    it("is  not Ending point",async()=>{
        await expect(HikeRefPoints.IsLastPoint(1,1)).resolves.toEqual(false);

    })


})