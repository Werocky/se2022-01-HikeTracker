const db = require("../modules/DB");

const ActivePoint= require("../modules/ActiveHike");
const H =require("../modules/Hikes");
const{hike}=require("../modules/Hikes");
const RP =require("../modules/ReferencePoints");
const HRP= require("../modules/HikeRefPoints");

const Hikes= require("../modules/Hikes");






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
    

    describe ("Get active Hike details" ,()=>{
        beforeEach(async()=>{
            
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


            //create all active points for the same Hike 2 for the same hiker and one for another hiker. points of failure
            await ActivePoint.emptyConnection();
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",2,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",3,1);
            await ActivePoint.RegisterActivePoint(1,"b@polito.it",1,1);
            await ActivePoint.RegisterActivePoint(1,"b@polito.it",2,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            


        });
        afterEach(async()=>{
            const RP =require("../modules/HikeRefPoints");
            await RP.emptyAllPoints();
            await ActivePoint.emptyConnection();
        });

        it("get Hike details of a certain active Hike",async()=>{
            await expect(ActivePoint.getUserHikeDetails("d@polito.it",1)).resolves.not.toEqual([]);
            let answer = await ActivePoint.getUserHikeDetails("d@polito.it",1);
            expect(answer).toHaveLength(3);
            for (let i = 0; i < answer.length; i++) {
                expect(answer[i]).toHaveProperty('PointID');
                expect(answer[i].PointID).toEqual(i+1);
                expect(answer[i]).toHaveProperty('description');
                expect(answer[i].description).toEqual(null);
                expect(answer[i]).toHaveProperty('Lat');
                expect(answer[i]).toHaveProperty('Lng');
                expect(answer[i]).toHaveProperty('Type');
                expect(answer[i]).toHaveProperty('ArrivalTime');
            switch(i){
                case 0:
                    expect(answer[i].Lat).toEqual(0)
                    expect(answer[i].Lng).toEqual(0)
                    expect(answer[i].Type).toEqual("parkingLot")
                    break;
                case 1:
                    expect(answer[i].Lat).toEqual(1)
                    expect(answer[i].Lng).toEqual(0)
                    expect(answer[i].Type).toEqual(null)
                    break;
                case 2:
                    expect(answer[i].Lat).toEqual(0)
                    expect(answer[i].Lng).toEqual(1)
                    expect(answer[i].Type).toEqual("hut")
                    break;
            }
            }

        })



    });

    describe("get Active Hikes",()=>{
            const Hikes= require("../modules/Hikes");
            const{hike}= require("../modules/Hikes");
            beforeEach(async()=>{
            
            
            await Hikes.deleteHikes();
            await Hikes.addHike(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,'Guide',null));


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


            //create all active points for the same Hike 2 for the same hiker and one for another hiker. points of failure
            await ActivePoint.emptyConnection();
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",2,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",3,1);
            await ActivePoint.RegisterActivePoint(1,"b@polito.it",1,1);
            await ActivePoint.RegisterActivePoint(1,"b@polito.it",2,1);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
            


        });
        afterEach(async()=>{
            const RP =require("../modules/HikeRefPoints");
            await RP.emptyAllPoints();
            await ActivePoint.emptyConnection();

            await Hikes.deleteHikes();

        });

        it("get my Hikes", async()=>{
            await expect(Hikes.getMyHikes("d@polito.it")).resolves.not.toEqual([]);
            let ans =await Hikes.getMyHikes("d@polito.it");
            expect(ans).toHaveLength(1);//TODO confirm it should be 1 or 2 in case is for each activeHikeID

        })
    })

});

describe("get Active Hikes",()=>{
    
    beforeEach(async()=>{
    
    
    await Hikes.deleteHikes();
    await Hikes.addHike(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,'Guide',null));


});
afterEach(async()=>{

    await ActivePoint.emptyConnection();

    await Hikes.deleteHikes();

});

it("Change Picture path", async()=>{
    await expect(Hikes.setHikePicture(1,"/newPath")).resolves.toEqual({"message":"picture set"});
    let ans=await Hikes.getHikesByFilter('HikeID',1);
    expect(ans[0].Picture).toEqual("/newPath");
})
})

describe("Missing tests",()=>{
    beforeEach(async()=>{
            
            
        await Hikes.deleteHikes();
        await Hikes.addHike(new hike(1,'title',1,null,1,'p',1,null,null,null,null,"Fakenull.gpx",0,0,'Guide',null));


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


        //create all active points for the same Hike 2 for the same hiker and one for another hiker. points of failure
        await ActivePoint.emptyConnection();
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,1);
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",2,1);
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",3,1);
        await ActivePoint.RegisterActivePoint(1,"b@polito.it",1,1);
        await ActivePoint.RegisterActivePoint(1,"b@polito.it",2,1);
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
        await ActivePoint.RegisterActivePoint(1,"d@polito.it",1,2);
        


    });
    afterEach(async()=>{
        const RP =require("../modules/HikeRefPoints");
        await RP.emptyAllPoints();
        await ActivePoint.emptyConnection();

        await Hikes.deleteHikes();

    });
    it("test get starting time",async()=>{
        await expect(ActivePoint.getStartingTime(1,1,"d@polito.it")).resolves.not.toEqual(null);
    });
    it("test get current active hike",async()=>{
        await expect(ActivePoint.getCurrentActiveHike("d@polito.it",1)).resolves.not.toEqual(null);
    });
    it("test get hiker points of hike",async()=>{
        await expect(ActivePoint.getHikerPointsOfHike("d@polito.it",1)).resolves.not.toEqual(null);
    });
    it("test get point reached info",async()=>{
        await expect(ActivePoint.getPointReachedInfo(1,1,"d@polito.it")).resolves.not.toEqual(null);
    });
});