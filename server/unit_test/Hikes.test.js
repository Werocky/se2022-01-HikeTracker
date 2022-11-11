const hikes = require('../modules/Hikes');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await hikes.deleteHikes();
   } 
)
afterAll(async()=>{
   await hikes.deleteHikes();

})

describe("Get/add Hikes",()=>{
    test('Get all Hikes empty db',async()=>{
        await expect(hikes.getHikes()).resolves.toEqual([]);
    });

    test('insert a new Hike', async()=>{
        await expect(hikes.addHike(0,0,0,0,0,0,0,0,0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHikes()).resolves.toEqual([{"Ascent":0,"Description":null,"Difficulty":"0","ExpectedTime":0,"HikeID":"0","Length":0,"End":"0","Start":"0","Title":"0"}]);
    })

    test('Empty hikes db', async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
    })
});

describe("get Hikes by Filter",()=>{
    beforeEach(
            async ()=>{
                await hikes.deleteHikes();
                //                 (ID Title  Length, ExTime, Ascent Difficulty  , Start, End      Description
                // await hikes.addHike(0,'title1' ,12.5, 180,    500  ,'begginer'     ,0.00  ,1.2   ,null);
                // await hikes.addHike(1,'title2',5   ,  60 ,    300.5,'Professional' ,0.1   ,1.454 ,null);
                // await hikes.addHike(2,'title3',7.0 ,90 ,-190 ,'undertermined',232.56,0.5567,null);
                await hikes.populateHikes();
            }
        );
        afterEach(
            async()=>{
                await hikes.deleteHikes();
            }
        )
    describe("get Hikes by a specific Filter", ()=>{
        
        test("get an existing ID",async()=>{
            await expect(hikes.getHikesByFilter('HikeID',1)).resolves.toEqual([{
                    "Ascent": 300.5,
                    "Description": null,
                     "Difficulty": "Professional",
                     "End": "1.454",
                     "ExpectedTime": 60,
                     "HikeID": "1",
                     "Length": 5,
                     "Start": "0.1",
                     "Title": "title2",
                }]);
        })
        test("get an ExpectedTime",async()=>{
            await expect(hikes.getHikesByFilter('ExpectedTime',60)).resolves.toEqual([{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                }]);
        })
        test("get an Lenght",async()=>{
            await expect(hikes.getHikesByFilter('Length',5)).resolves.toEqual([{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                }]);
        })
        test("get an Ascent",async()=>{
            await expect(hikes.getHikesByFilter('Ascent',300.5)).resolves.toEqual([{
                "Ascent": 300.5,
                "Description": null,
                 "Difficulty": "Professional",
                 "End": "1.454",
                 "ExpectedTime": 60,
                 "HikeID": "1",
                 "Length": 5,
                 "Start": "0.1",
                 "Title": "title2",
                }]);
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
            test("get a range of IDs",async()=>{
                await expect(hikes.getHikesByFilter('HikeID',0,5)).resolves.toEqual([{
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
            });
            test("get a range of Ascents/Descents",async()=>{
                await expect(hikes.getHikesByFilter('HikeID',0,1000)).resolves.toEqual([{
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




});