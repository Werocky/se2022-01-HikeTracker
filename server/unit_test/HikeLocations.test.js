const HL = require('../modules/HikeLocations');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await HL.emptyLocations();
   } 
)
afterAll(async()=>{
   await HL.emptyLocations();
   //await db.populate();
   
} )

describe("Get/add HikeLocations",()=>{
    beforeEach(async() =>{   
        await HL.emptyLocations();
        
       } 
    )
    afterEach(async()=>{
       await HL.emptyLocations();
       
    })
    test('Get all HikeLocations empty db',async()=>{
        await expect(HL.getHikeLocations()).resolves.toEqual([]);
    });
    test('Get all HikeLocations',async()=>{
        await expect(HL.populateLocations()).resolves.toEqual('Tables filled');
        await expect(HL.getHikeLocations()).resolves.toEqual([
            {
                     "City": "Cervinia",
                     "HikeID": "1",
                     "Province": "Aosta",
                   },
        ]);
    });

    test('Get Hike location By ID', async()=>{
        await expect(HL.populateLocations()).resolves.toEqual('Tables filled');
        await expect(HL.getHikeLocationsPerID(1)).resolves.toEqual([
            {
                     "City": "Cervinia",
                     "HikeID": "1",
                     "Province": "Aosta",
                   },
        ]);
    });

});

