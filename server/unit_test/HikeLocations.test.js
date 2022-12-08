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
        await expect(HL.getHikeLocations()).resolves.not.toEqual([]);
        let hl= await HL.getHikeLocations()
        expect(hl).toHaveLength(1)
        expect(hl[0]).toHaveProperty('City')
        expect(hl[0]).toHaveProperty('HikeID')
        expect(hl[0]).toHaveProperty('Country')
        expect(hl[0]).toHaveProperty('Region')
        expect(hl[0].City).toEqual("Cervinia")
        expect(hl[0].HikeID).toEqual(1)
        expect(hl[0].Region).toEqual("Aosta")
        expect(hl[0].Country).toEqual(null)
    });

    test('Get Hike location By ID', async()=>{
        await expect(HL.populateLocations()).resolves.toEqual('Tables filled');
        await expect(HL.getHikeLocationsPerID(1)).resolves.not.toEqual([]);
        let hl= await HL.getHikeLocationsPerID(1)

        expect(hl).toHaveProperty('City')
        expect(hl).toHaveProperty('HikeID')
        expect(hl).toHaveProperty('Country')
        expect(hl).toHaveProperty('Region')
        expect(hl.City).toEqual("Cervinia")
        expect(hl.HikeID).toEqual(1)
        expect(hl.Region).toEqual("Aosta")
        expect(hl.Country).toEqual(null)
    })
    describe("add new location",()=>{
        beforeEach(async() =>{   
            await HL.emptyLocations();
           } 
        )

        it("add correctly a location",async()=>{
            await expect(HL.addLocation(1,'city','region')).resolves.toEqual('New location added');
        });
        it("missing new location",async ()=>{
            await expect(HL.addLocation(1)).rejects.toEqual('no new location');

        })

    })

});


