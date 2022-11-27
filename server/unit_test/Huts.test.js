const Huts = require('../modules/Huts');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await Huts.emptyHuts();
   })
afterAll(async()=>{
    await Huts.emptyHuts();
   //await db.populate();
   
},db.timeout)

describe("getting/deleting huts",()=>{
    it("get empty hut list",async()=>{
        await expect(Huts.getHuts()).resolves.toEqual([]);
    })

    describe("New hut",()=>{
        test("adding a new hut",async()=>{
            await  expect(Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description')).resolves.toEqual('Hut added');
            let  h = await Huts.getHuts()
            // console.log(h);
            expect(h).toHaveLength(1);
            expect(h[0]).toHaveProperty('RefPointID');
            expect(h[0].RefPointID).toEqual("0");
            expect(h[0]).toHaveProperty('Name');
            expect(h[0].Name).toEqual('Name');
            expect(h[0]).toHaveProperty('Elevation');
            expect(h[0].Elevation).toEqual(0);
            expect(h[0]).toHaveProperty('City');
            expect(h[0].City).toEqual('City');
            expect(h[0]).toHaveProperty('Province');
            expect(h[0].Province).toEqual('Province');
            expect(h[0]).toHaveProperty('Region');
            expect(h[0].Region).toEqual('Region');
            expect(h[0]).toHaveProperty('Country');
            expect(h[0].Country).toEqual('Country');
            expect(h[0]).toHaveProperty('WhenOpen');
            expect(h[0].WhenOpen).toEqual('WhenOpen');
            expect(h[0]).toHaveProperty('Beds');
            expect(h[0].Beds).toEqual(0);
            expect(h[0]).toHaveProperty('AvgPrice')
            expect(h[0].AvgPrice).toEqual(0);
            expect(h[0]).toHaveProperty('Description');
            expect(h[0].Description).toEqual('Description');
        })
        test("adding a new hut with a repeated ID",async()=>{

            await  expect(Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description')).rejects.not.toEqual(null);
            
        })



    });

    describe("delete a Hut", ()=>{
        beforeEach(async()=>{
            await Huts.emptyHuts();
            await Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description');

        })
        test("Delete a hut witha specific ID",async()=>{

            await  expect(Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description')).rejects.not.toEqual(null);
            await expect(Huts.deleteHut(0)).resolves.toEqual("Entry deleted");
            await expect(Huts.getHuts()).resolves.toEqual([]);

        })
    });

    describe("Get Locations", ()=>{
        beforeEach(async()=>{
            await Huts.emptyHuts();
            await Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description');
            await Huts.addHut(1, 'Name1', 0, 'City1', 'Province1', 'Region1', 'Country1', 'WhenOpen1', 0, 0, 'Description');
            await Huts.addHut(2, 'Name2', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description');

        })
        test("get all cities from huts",async()=>{
            let h=await Huts.getHutCity();

            expect(h).toHaveLength(2);
            expect(h).toContain('City')
            expect(h).toContain('City1')
        })

        test("get all Provinces from huts",async()=>{
            let h=await Huts.getHutProvince();

            expect(h).toHaveLength(2);
            expect(h).toContain('Province1')
            expect(h).toContain('Province')
        })

        test("get all Regions from huts",async()=>{
            let h=await Huts.getHutRegion();

            expect(h).toHaveLength(2);
            expect(h).toContain('Region1')
            expect(h).toContain('Region')
        })

        test("get all Countries from huts",async()=>{
            let h=await Huts.getHutCountry();

            expect(h).toHaveLength(2);
            expect(h).toContain('Country1')
            expect(h).toContain('Country')
        })
    });
    

})

describe("Hut Filters",()=>{
    beforeEach(async()=>{
        await Huts.emptyHuts();
        await Huts.addHut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description');
        await Huts.addHut(1, 'Name1', 0, 'City1', 'Province1', 'Region1', 'Country1', 'WhenOpen1', 0, 0, 'Description');
        await Huts.addHut(2, 'Name2', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description');

    })
    test("No defined params",async()=>{
        await expect(Huts.getHutsFilters()).resolves.not.toEqual(null);
    })
    describe("Name filter",()=>{
        test("Name is expected",async()=>{
            await expect(Huts.getHutsFilters(name='Name')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(name='Name');
            expect(h).toHaveLength(1);

        })
        test("Name is not expected",async()=>{
            await expect(Huts.getHutsFilters(name='NameNotIn')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(name='NameNotIn');
            expect(h).toHaveLength(0);
            
        })
    });
    describe("Location filter",()=>{
        test("Location is expecteda and location type is expected",async()=>{
            await expect(Huts.getHutsFilters(null,locationType='City',location='City1')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(null,locationType='City',location='City1');
            expect(h).toHaveLength(1);

        })
        test("Name is not expected",async()=>{
            await expect(Huts.getHutsFilters(null,location='NameNotIn')).rejects.not.toEqual(null);
            
        })
        test("Name is not expected",async()=>{
            await expect(Huts.getHutsFilters(null,locationType='City','NameNotIn')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(null,locationType='City',location='NameNotIn');
            expect(h).toHaveLength(0);
            
        })
    });
    

})





