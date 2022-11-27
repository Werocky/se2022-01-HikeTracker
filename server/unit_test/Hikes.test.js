const hikes = require('../modules/Hikes');
const db = require("../modules/DB");
const locations = require ("../modules/HikeLocations");



beforeAll(async() =>{   
    await db.createConnection();
    await hikes.deleteHikes();
    await new Promise(process.nextTick);
   })
afterAll(async()=>{
   await hikes.deleteHikes();
  // await db.populate();
   await new Promise(process.nextTick);

} )

describe("Get/add Hikes",()=>{
    test('Get all Hikes empty db',async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
        await expect(hikes.getHikes()).resolves.toEqual([]);
    });

    test('insert a new Hike', async()=>{
        await expect(hikes.addHike(0,0,0,0,0,0,0,0,0,0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHikes()).resolves.toEqual([{"Ascent":0,"Description":"0","Difficulty":"0","ExpectedTime":0,"HikeID":"0","Length":0,"End":"0","Start":"0","Title":"0"}]);
        //await expect(hikes.getHike(0)).resolves.not.toEqual([])
    })

    test('Empty hikes db', async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
    })
});

describe("get Hikes by Filter",()=>{
    beforeEach(
            async ()=>{
                await locations.emptyLocations();
                await locations.addLocation(1,'Baviera','Monaco');
                await locations.addLocation(2,'Dpto La Paz','La paz');
                await locations.addLocation(0,'Piemonte','Torino');
                await hikes.deleteHikes();
                await hikes.addHike(0,'title1' ,12.5, 180,    500  ,'begginer'     ,0.00  ,1.2   ,null);
                await hikes.addHike(1,'title2',5   ,  60 ,    300.5,'Professional' ,0.1   ,1.454 ,null);
                await hikes.addHike(2,'title3',7.0 ,90 ,-190 ,'undertermined',232.56,0.5567,null);
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
            expect(h[0].Ascent).toEqual( 300.5)
            expect(h[0]).toHaveProperty('Description');
            expect(h[0].Description).toEqual(null)
            expect(h[0]).toHaveProperty('Difficulty');
            expect(h[0].Difficulty).toEqual("Professional")
            expect(h[0]).toHaveProperty('End');
            expect(h[0].End).toEqual("1.454")
            expect(h[0]).toHaveProperty('ExpectedTime');
            expect(h[0].ExpectedTime).toEqual(60)
            expect(h[0]).toHaveProperty('HikeID');
            expect(h[0].HikeID).toEqual("1")
            expect(h[0]).toHaveProperty('Length');
            expect(h[0].Length).toEqual(5)
            expect(h[0]).toHaveProperty('Start');
            expect(h[0].Start).toEqual("0.1")
            expect(h[0]).toHaveProperty('Title');
            expect(h[0].Title).toEqual("title2")
           
        })
        test("get by ExpectedTime",async()=>{
            await expect(hikes.getHikesByFilter('ExpectedTime',60)).resolves.toEqual([{
                "Ascent": 500,
         "Description": null,
         "Difficulty": "begginer",
         "End": "1.2",
         "ExpectedTime": 180,
         "HikeID": "0",
         "Length": 12.5,
         "Start": "0",
         "Title": "title1",
       },{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                },
                {
                         "Ascent": -190,
                         "Description": null,
                         "Difficulty": "undertermined",
                         "End": "0.5567",
                         "ExpectedTime": 90,
                         "HikeID": "2",
                         "Length": 7,
                         "Start": "232.56",
                         "Title": "title3",
                        },]);
        })
        test("get by Lenght",async()=>{
            await expect(hikes.getHikesByFilter('Length',5)).resolves.toEqual([{
                     "Ascent": 500,
                     "Description": null,
                     "Difficulty": "begginer",
                     "End": "1.2",
                     "ExpectedTime": 180,
                     "HikeID": "0",
                     "Length": 12.5,
                     "Start": "0",
                     "Title": "title1",
                   },
                 {
                      "Ascent": 300.5,
                      "Description": null,
                      "Difficulty": "Professional",
                      "End": "1.454",
                      "ExpectedTime": 60,
                      "HikeID": "1",
                      "Length": 5,
                      "Start": "0.1",
                      "Title": "title2",
                   },
                   {
                     "Ascent": -190,
                     "Description": null,
                     "Difficulty": "undertermined",
                     "End": "0.5567",
                     "ExpectedTime": 90,
                     "HikeID": "2",
                     "Length": 7,
                     "Start": "232.56",
                     "Title": "title3",
                   },]);
        })
        test("get by Ascent",async()=>{
            await expect(hikes.getHikesByFilter('Ascent',300.5)).resolves.toEqual([{
                         "Ascent": 500,
                         "Description": null,
                         "Difficulty": "begginer",
                         "End": "1.2",
                         "ExpectedTime": 180,
                         "HikeID": "0",
                         "Length": 12.5,
                         "Start": "0",
                         "Title": "title1",
                       },{
                
                        "Ascent": 300.5,
                        "Description": null,
                         "Difficulty": "Professional",
                         "End": "1.454",
                         "ExpectedTime": 60,
                         "HikeID": "1",
                         "Length": 5,
                         "Start": "0.1",
                         "Title": "title2",
                        },]);
        })
        test("get by Difficulty",async()=>{
            await expect(hikes.getHikesByFilter('Difficulty',"begginer")).resolves.toEqual([{
                "Ascent": 500,
                "Difficulty": "begginer",
                "End": "1.2",
                 "ExpectedTime": 180,
                 "HikeID": "0",
                 "Length": 12.5,
                 "Start": "0",
                 "Title": "title1",
                 "Description":null,
                }]);
        })
        test("get by Title",async()=>{
            await expect(hikes.getHikesByFilter('Title',"title1")).resolves.toEqual([{
                    "Ascent": 500,
                     "Description": null,
                     "Difficulty": "begginer",
                     "End": "1.2",
                     "ExpectedTime": 180,
                     "HikeID": "0",
                     "Length": 12.5,
                     "Start": "0",
                     "Title": "title1",
                }]);
        })
        test("get by a non acceptable field",async()=>{
            await expect(hikes.getHikesByFilter('Unacceptable')).rejects.toEqual('No such field');
        })

        
    });

    describe(
        "get Hikes by a Range of values",()=>{
            test("get a range of Ascents/Descents",async()=>{
                await expect(hikes.getHikesByFilter('Ascent',0,1000)).resolves.toEqual([{
                         "Ascent": 500,
                         "Description": null,
                         "Difficulty": "begginer",
                         "End": "1.2",
                        "ExpectedTime": 180,
                         "HikeID": "0",
                         "Length": 12.5,
                         "Start": "0",
                         "Title": "title1",
                       },
                        {
                         "Ascent": 300.5,
                         "Description": null,
                         "Difficulty": "Professional",
                         "End": "1.454",
                         "ExpectedTime": 60,
                         "HikeID": "1",
                         "Length": 5,
                         "Start": "0.1",
                         "Title": "title2",
                       },
                       ]);
            })

        }
    );

    describe('testing added the Join with HikeLocations', ()=>{
        test("get by HikeLocation Province",async()=>{
            await expect(hikes.getHikesByFilter('Province','Baviera')).resolves.toEqual([{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                },]);
        })
        test("get by HikeLocation City",async()=>{
            await expect(hikes.getHikesByFilter('City','Monaco')).resolves.toEqual([{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                },]);
        })
    })

    describe("start/ end point editing", ()=>{
        it("edit start/End points",async()=>{
           
            await expect(hikes.editStartEndPoints(1,1,1)).resolves.toEqual("Hike's start and end points updated.")
            let h= await hikes.getHike(1);
            
            expect(h).toHaveProperty('Ascent');
            expect(h.Ascent).toEqual( 300.5)
            expect(h).toHaveProperty('Description');
            expect(h.Description).toEqual(null)
            expect(h).toHaveProperty('Difficulty');
            expect(h.Difficulty).toEqual("Professional")
            expect(h).toHaveProperty('End');
            expect(h.End).toEqual("1")
            expect(h).toHaveProperty('ExpectedTime');
            expect(h.ExpectedTime).toEqual(60)
            expect(h).toHaveProperty('HikeID');
            expect(h.HikeID).toEqual("1")
            expect(h).toHaveProperty('Length');
            expect(h.Length).toEqual(5)
            expect(h).toHaveProperty('Start');
            expect(h.Start).toEqual("1")
            expect(h).toHaveProperty('Title');
            expect(h.Title).toEqual("title2")
        })
    })
    test("set description",async()=>{
        await hikes.deleteHikes();
        await expect(hikes.addHike(0,0,0,0,0,0,0,0,0,0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHike(0)).resolves.not.toEqual([])
        let h= await hikes.getHike(0)
        expect(h).toHaveProperty('Ascent');
        expect(h.Ascent).toEqual( 0)
        expect(h).toHaveProperty('Description');
        expect(h.Description).toEqual("0")
        expect(h).toHaveProperty('Difficulty');
        expect(h.Difficulty).toEqual("0")
        expect(h).toHaveProperty('End');
        expect(h.End).toEqual("0")
        expect(h).toHaveProperty('ExpectedTime');
        expect(h.ExpectedTime).toEqual(0)
        expect(h).toHaveProperty('HikeID');
        expect(h.HikeID).toEqual("0")
        expect(h).toHaveProperty('Length');
        expect(h.Length).toEqual(0)
        expect(h).toHaveProperty('Start');
        expect(h.Start).toEqual("0")
        expect(h).toHaveProperty('Title');
        expect(h.Title).toEqual("0")

        await expect(hikes.setDescription("a description",0)).resolves.toEqual(`Description added for Hike 0`)
        h= await hikes.getHike(0)
        expect(h).toHaveProperty('Ascent');
        expect(h.Ascent).toEqual( 0)
        expect(h).toHaveProperty('Description');
        expect(h.Description).toEqual("a description")
        expect(h).toHaveProperty('Difficulty');
        expect(h.Difficulty).toEqual("0")
        expect(h).toHaveProperty('End');
        expect(h.End).toEqual("0")
        expect(h).toHaveProperty('ExpectedTime');
        expect(h.ExpectedTime).toEqual(0)
        expect(h).toHaveProperty('HikeID');
        expect(h.HikeID).toEqual("0")
        expect(h).toHaveProperty('Length');
        expect(h.Length).toEqual(0)
        expect(h).toHaveProperty('Start');
        expect(h.Start).toEqual("0")
        expect(h).toHaveProperty('Title');
        expect(h.Title).toEqual("0")

    })

});