const hikes = require('../modules/Hikes');
const db = require("../modules/DB");
const locations = require ("../modules/HikeLocations");
const {hike}= require('../modules/Hikes');



beforeAll(async() =>{   
    await db.createConnection();
    await hikes.deleteHikes();

   } )
afterAll(async()=>{
   await hikes.deleteHikes();

} )
const h0= new hike(null,'0','0','0','0','0','0','0','0','0','0','0','0','0');
describe("Get/add Hikes",()=>{
    test('Get all Hikes empty db',async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
        await expect(hikes.getHikes()).resolves.toEqual([]);
    });

    test('insert a new hike', async()=>{
        await expect(hikes.addHike(h0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHikes()).resolves.not.toEqual([]);
        let tempH= await hikes.getHikes();
        expect(tempH).toHaveLength(1);
        tempH=tempH[0];
        expect(tempH).toHaveProperty('HikeID')
        expect(tempH).toHaveProperty('Title')
        expect(tempH).toHaveProperty('Description')
        expect(tempH).toHaveProperty('Ascent')
        expect(tempH).toHaveProperty('Difficulty')
        expect(tempH).toHaveProperty('ExpectedTime')
        expect(tempH).toHaveProperty('Country')
        expect(tempH).toHaveProperty('Region')
        expect(tempH).toHaveProperty('City')
        expect(tempH).toHaveProperty('GpxFile')
        expect(tempH).toHaveProperty('Start')
        expect(tempH).toHaveProperty('End')
        expect(tempH).toHaveProperty('AssociatedGuide')
        expect(tempH).toHaveProperty('Length')

  
    })

    test('Empty hikes db', async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
    })

    test("get last hike", async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
        let h1=new hike(null,'10','0','0','0','0','0','0','0','0','0','01.gpx','0','0','0')
        let h2=new hike(null, '11','0','0','0','0','0','0','0','0','0','02.gpx','0','0','0')
        await expect(hikes.addHike(h0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHikes()).resolves.not.toEqual([]);
        await expect(hikes.getLastHikeId()).resolves.toEqual(1);
        
        await expect(hikes.addHike(h1)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getLastHikeId()).resolves.toEqual(2);
        await expect(hikes.addHike(h2)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getLastHikeId()).resolves.toEqual(3)
    })
});

describe("get Hikes by Filter",()=>{
    beforeEach(
            async ()=>{
                await hikes.deleteHikes();
                let h1=new hike(null, 'title1','12.5', null,'180','begginer','500','Bolita',null,'LaPAZ','laPax','0.gpx','0.00','1.2','1');
                let h2=new hike(null, 'title2','5'   ,'dessdc' , '60' , 'Professional' ,'180','Country1',null,'LaPAZ','laPax','20.gpx','0.1'   ,'1.454' ,'1')
                let h3=new hike(null, 'title3','7.0','desc','90' ,'undertermined','232.56','contry2',null,'LaPAZ','laPax','30.gpx','1.55','67','0')
                await hikes.addHike(h1);
                await hikes.addHike(h2);
                await hikes.addHike(h3);
                await locations.addLocation(1,'Baviera',null,'Monaco');
                await locations.addLocation(2,'Bolivia','Baviera','La paz');
                await locations.addLocation(0,'Italy','Piemonte','Torino');
                
            }
        );
        afterEach(
            async()=>{
                await hikes.deleteHikes();
                await locations.emptyLocations();
            }
        )
    describe("get Hikes by a specific Filter or higher(for lenght|ExpectedTime|Ascent)", ()=>{
        
        test("get a existing ID",async()=>{
            await expect(hikes.getHikesByFilter('HikeID',1)).resolves.not.toEqual([]);
            let h= await hikes.getHikesByFilter('HikeID',1);
            expect(h).toHaveLength(1);
            expect(h[0]).toHaveProperty('Ascent');
            expect(h[0].Ascent).toEqual( 180)
            expect(h[0]).toHaveProperty('Description');
            expect(h[0].Description).toEqual(null)
            expect(h[0]).toHaveProperty('Difficulty');
            expect(h[0].Difficulty).toEqual("begginer")
            expect(h[0]).toHaveProperty('End');
            expect(h[0].End).toEqual(1.2)
            expect(h[0]).toHaveProperty('ExpectedTime');
            expect(h[0].ExpectedTime).toEqual(500)
            expect(h[0]).toHaveProperty('HikeID');
            expect(h[0].HikeID).toEqual(1)
            expect(h[0]).toHaveProperty('Length');
            expect(h[0].Length).toEqual(12.5)
            expect(h[0]).toHaveProperty('Start');
            expect(h[0].Start).toEqual(0.0)
            expect(h[0]).toHaveProperty('Title');
            expect(h[0].Title).toEqual("title1")
            expect(h[0].City).toEqual('Monaco')
           
        })
        test("get by ExpectedTime",async()=>{
            await expect(hikes.getHikesByFilter('ExpectedTime',60)).resolves.not.toEqual();
        })
        test("get by Lenght",async()=>{
            await expect(hikes.getHikesByFilter('Length',5)).resolves.not.toEqual([]);
            let h1=await hikes.getHikesByFilter('Length',5);
          
            expect(h1).toHaveLength(3);
        })
        test("get by Ascent",async()=>{
            await expect(hikes.getHikesByFilter('Ascent',70)).resolves.not.toEqual([]);
            let h=await hikes.getHikesByFilter('Ascent',70);
            
           
            expect(h).toHaveLength(2);
        })
        test("get by Difficulty",async()=>{
            await expect(hikes.getHikesByFilter('Difficulty',"begginer")).resolves.not.toEqual([]);
            let h=await hikes.getHikesByFilter('Difficulty',"begginer");
            
            
            expect(h).toHaveLength(1);
        })
        test("get by Title",async()=>{
            await expect(hikes.getHikesByFilter('Title',"title1")).resolves.not.toEqual([]);
            let h=await hikes.getHikesByFilter('Title',"title1");
           
           
            expect(h).toHaveLength(1);
        })
        test("get by a non acceptable field",async()=>{
            await expect(hikes.getHikesByFilter('Unacceptable')).rejects.toEqual('No such field');
        })

        
    });

    describe(
        "get Hikes by a Range of values",()=>{
            test("get a range of Ascents/Descents",async()=>{
                await expect(hikes.getHikesByFilter('Ascent',0,1000)).resolves.not.toEqual();
                let h=await hikes.getHikesByFilter('Ascent',0,1000);
                expect(h).toHaveLength(3)
                h=await hikes.getHikesByFilter('Ascent',50,70);
                expect(h).toHaveLength(1)
            })

        }
    );

    describe('testing added the Join with HikeLocations', ()=>{
        test("get by HikeLocation Region",async()=>{
            await expect(hikes.getHikesByFilter('Region','Baviera')).resolves.not.toEqual();
            let h=await hikes.getHikesByFilter('Region','Baviera');
                expect(h).toHaveLength(1)
        })
        test("get by HikeLocation City",async()=>{
            await expect(hikes.getHikesByFilter('City','Monaco')).resolves.not.toEqual();
                let h=await hikes.getHikesByFilter('City','Monaco');
                expect(h).toHaveLength(1)
        })
        
    })

    describe("start/ end point editing", ()=>{
        it("edit start/End points",async()=>{
           
            await expect(hikes.editStartEndPoints(1,1,1)).resolves.toEqual("Hike's start and end points updated.")
            let h= await hikes.getHike(1);
            
            expect(h).toHaveProperty('Ascent');
            expect(h.Ascent).toEqual( 180)
            expect(h).toHaveProperty('Description');
            expect(h.Description).toEqual(null)
            expect(h).toHaveProperty('Difficulty');
            expect(h.Difficulty).toEqual("begginer")
            expect(h).toHaveProperty('End');
            expect(h.End).toEqual(1)
            expect(h).toHaveProperty('ExpectedTime');
            expect(h.ExpectedTime).toEqual(500)
            expect(h).toHaveProperty('HikeID');
            expect(h.HikeID).toEqual(1)
            expect(h).toHaveProperty('Length');
            expect(h.Length).toEqual(12.5)
            expect(h).toHaveProperty('Start');
            expect(h.Start).toEqual(1)
            expect(h).toHaveProperty('Title');
            expect(h.Title).toEqual("title1")
        })
    })
    test("set description",async()=>{
        await hikes.deleteHikes();
        await expect(hikes.addHike(h0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHike(1)).resolves.not.toEqual([])
        let h= await hikes.getHike(1)
        expect(h).toHaveProperty('Ascent');
        expect(h.Ascent).toEqual( 0)
        expect(h).toHaveProperty('Description');
        expect(h.Description).toEqual("0")
        expect(h).toHaveProperty('Difficulty');
        expect(h.Difficulty).toEqual("0")
        expect(h).toHaveProperty('End');
        expect(h.End).toEqual(0)
        expect(h).toHaveProperty('ExpectedTime');
        expect(h.ExpectedTime).toEqual(0)
        expect(h).toHaveProperty('HikeID');
        expect(h.HikeID).toEqual(1)
        expect(h).toHaveProperty('Length');
        expect(h.Length).toEqual(0)
        expect(h).toHaveProperty('Start');
        expect(h.Start).toEqual(0)
        expect(h).toHaveProperty('Title');
        expect(h.Title).toEqual("0")

        await expect(hikes.setDescription("a description",1)).resolves.toEqual(`Description added for Hike 1`)
        h= await hikes.getHike(1)
        expect(h).toHaveProperty('Ascent');
        expect(h.Ascent).toEqual( 0)
        expect(h).toHaveProperty('Description');
        expect(h.Description).toEqual("a description")
        expect(h).toHaveProperty('Difficulty');
        expect(h.Difficulty).toEqual("0")
        expect(h).toHaveProperty('End');
        expect(h.End).toEqual(0)
        expect(h).toHaveProperty('ExpectedTime');
        expect(h.ExpectedTime).toEqual(0)
        expect(h).toHaveProperty('HikeID');
        expect(h.HikeID).toEqual(1)
        expect(h).toHaveProperty('Length');
        expect(h.Length).toEqual(0)
        expect(h).toHaveProperty('Start');
        expect(h.Start).toEqual(0)
        expect(h).toHaveProperty('Title');
        expect(h.Title).toEqual("0")

    })

});


