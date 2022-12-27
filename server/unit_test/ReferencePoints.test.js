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
        it("add a SP already present",async()=>{
            await HikeRefPoints.addHikeRefPoints(1,1,1,0);

            await expect(HikeRefPoints.addHikeRefPoints(1,1,1,0)).rejects.toEqual("Linked yet");

        })

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


describe("get reference point",()=>{
    const H=  require("../modules/Hikes").addHike;
    const {hike}= require("../modules/Hikes");
    beforeEach(async()=>{
        await h.deleteHikes();
        await refPts.emptyReferencePoint();
        await H(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,'Guide',null));
        await refPts.addReferencePoint(0,0,"no type");
        await refPts.addReferencePoint(0,1,"no type2");
        await HikeRefPoints.addHikeRefPoints(1,1,1,0);
        await HikeRefPoints.addHikeRefPoints(1,2,0,1);
    });
    
    it("get point",async()=>{
        await expect(refPts.getReferencePoint(1)).resolves.not.toEqual([]);
        let rp= await refPts.getReferencePoint(1);
        expect(rp).toHaveProperty('RefPointID');
        expect(rp.RefPointID).toEqual(1);
    })

    it("get non existing point",async()=>{
        await expect(refPts.getReferencePoint(-1)).resolves.toEqual(undefined);
        
    })




})

describe("get activeHike details",()=>{
    beforeEach(async()=>{
        const {hike}= require("../modules/Hikes");
        await h.deleteHikes();
        await h.addHike(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,'Guide',null));

        const RP1= require("../modules/ReferencePoints");

        await RP1.emptyReferencePoint();
        await RP1.addReferencePoint(0,0,'parkingLot');
        await RP1.addReferencePoint(1,0,null);
        await RP1.addReferencePoint(0,1,'hut');

        const RP =require("../modules/HikeRefPoints");
        await RP.emptyHikeRefPoint();
        await RP.addHikeRefPoints(1,1,1,0);
        await RP.addHikeRefPoints(1,2,0,0);
        await RP.addHikeRefPoints(1,3,0,1);




    });
    afterEach(async()=>{
        await h.deleteHikes();
        await HikeRefPoints.emptyAllPoints();
    });

    it("get active Hike Info",async()=>{
        await expect(HikeRefPoints.getHikeInfo(1)).resolves.not.toEqual([]);
        let ans= await HikeRefPoints.getHikeInfo(1);
        expect(ans).toHaveLength(3);

        for (let i = 0; i < ans.length; i++) {
            expect(ans[i]).toHaveProperty('HikeID');
            expect(ans[i].HikeID).toEqual(1);
            expect(ans[i]).toHaveProperty('RefPointID');
            expect(ans[i].RefPointID).toEqual(i+1);
            expect(ans[i]).toHaveProperty('IsStart');
            expect(ans[i].IsStart).toEqual(i==0? 1:0);
            expect(ans[i]).toHaveProperty('IsEnd');
            expect(ans[i].IsEnd).toEqual(i==2? 1:0);
            expect(ans[i]).toHaveProperty('Lat');
            expect(ans[i]).toHaveProperty('Lng');
            expect(ans[i]).toHaveProperty('Type');
            expect(ans[i]).toHaveProperty('Length');
            expect(ans[i]).toHaveProperty('Title');
            expect(ans[i].Title).toEqual('title');
            expect(ans[i]).toHaveProperty('ExpectedTime');
            expect(ans[i].ExpectedTime).toEqual(1);
            expect(ans[i]).toHaveProperty('Ascent');
            expect(ans[i].Ascent).toEqual(1);
            expect(ans[i]).toHaveProperty('Difficulty');
            expect(ans[i].Difficulty).toEqual('p');
            expect(ans[i]).toHaveProperty('Start');
            expect(ans[i].Start).toEqual(0);
            expect(ans[i]).toHaveProperty('End');
            expect(ans[i].End).toEqual(0);
            expect(ans[i]).toHaveProperty('Description');
            expect(ans[i].Description).toEqual(null);
        }
        


    })

    it("get Hike reference Points",async()=>{
        await expect(HikeRefPoints.getHikeRefPoints(1)).resolves.not.toEqual([]);
        let ans= await HikeRefPoints.getHikeRefPoints(1);
        expect(ans).toHaveLength(3);

        for (let i = 0; i < ans.length; i++) {
            expect(ans[i]).toHaveProperty('IsStart');
            expect(ans[i].IsStart).toEqual(i==0? 1:0);
            expect(ans[i]).toHaveProperty('IsEnd');
            expect(ans[i].IsEnd).toEqual(i==2? 1:0);
            expect(ans[i]).toHaveProperty('Lat');
            expect(ans[i]).toHaveProperty('Lng');
            expect(ans[i]).toHaveProperty('Type');

        }
        


    })



})