const Huts = require('../modules/Huts');
const db = require("../modules/DB");
const {Hut}= require('../modules/Huts');
beforeAll(async() =>{   
    await db.createConnection();
    await Huts.emptyHuts();
   })
   const hut = new Hut(0, 'Name', 0, 'City', 'Province', 'Region', 'Country', 'WhenOpen', 0, 0, 'Description',1,'http://www.fakesite.it',123456789);

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
            await  expect(Huts.addHut(hut)).resolves.toEqual('Hut added');
            let  h = await Huts.getHuts()
            // console.log(h);
            expect(h).toHaveLength(1);
            expect(h[0]).toHaveProperty('RefPointID');
            expect(h[0].RefPointID).toEqual(1);
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
            expect(h[0]).toHaveProperty('HutManagerID');
            expect(h[0]).toHaveProperty('Website');
            expect(h[0]).toHaveProperty('Phone');
        })
    });

    describe("delete a Hut", ()=>{
        beforeEach(async()=>{
            await Huts.emptyHuts();
            await Huts.addHut(hut);

        })
        test("Delete a hut witha specific ID",async()=>{

            await Huts.emptyHuts();
            await expect(Huts.addHut(hut)).resolves.not.toEqual(null);
            await expect(Huts.deleteHut(1)).resolves.toEqual("Entry deleted");
            await expect(Huts.getHuts()).resolves.toEqual([]);

        })
    });

    describe("Get Locations", ()=>{
        beforeEach(async()=>{
            await Huts.emptyHuts();
            for (let i = 0; i < 3; i++) {
                let h =await new Hut(i, 'Name'+i, 0, 'City'+(i%2), 'Province'+(i%2), 'Region'+(i%2), 'Country'+(i%2), 'WhenOpen'+(i%2), 0, 0, 'Description',1,'http://www.fakesite.it',123456789)
                await Huts.addHut(h)
            }
           

        })
        test("get all cities from huts",async()=>{
            let h=await Huts.getHutCity();

            expect(h).toHaveLength(2);
            expect(h).toContain('City0')
            expect(h).toContain('City1')
        })

        test("get all Provinces from huts",async()=>{
            let h=await Huts.getHutProvince();

            expect(h).toHaveLength(2);
            expect(h).toContain('Province1')
            expect(h).toContain('Province0')
        })

        test("get all Regions from huts",async()=>{
            let h=await Huts.getHutRegion();

            expect(h).toHaveLength(2);
            expect(h).toContain('Region1')
            expect(h).toContain('Region0')
        })

        test("get all Countries from huts",async()=>{
            let h=await Huts.getHutCountry();

            expect(h).toHaveLength(2);
            expect(h).toContain('Country1')
            expect(h).toContain('Country0')
        })
    });
    

})

describe("Hut Filters",()=>{
    beforeEach(async()=>{
        await Huts.emptyHuts();
        for (let i = 0; i < 3; i++) {
            let h =await new Hut(i, 'Name'+i, 0, 'City'+(i%2), 'Province'+(i%2), 'Region'+(i%2), 'Country'+(i%2), 'WhenOpen'+(i%2), 0, 0, 'Description',1,'http://www.fakesite.it',123456789)
            await Huts.addHut(h)
        }
       

    })
    test("No defined params",async()=>{
        await expect(Huts.getHutsFilters()).resolves.not.toEqual(null);
    })
    describe("Name filter",()=>{
        test("Name is expected",async()=>{
            await expect(Huts.getHutsFilters('Name1')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters('Name1');
            expect(h).toHaveLength(1);

        })
        test("Name is not expected",async()=>{
            await expect(Huts.getHutsFilters('NameNotIn')).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters('NameNotIn');
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
    describe("When Open",()=>{
        test("Location is Open expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,'WhenOpen0',null,null)).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(null,null,null,'WhenOpen0');
            expect(h).toHaveLength(2);

        })
        test("open is not expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,'WhenNotOpen')).resolves.toEqual([]);
            
        })

    });
    describe("When Beds",()=>{
        test("Location is Open expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,null,0,null)).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(null,null,null,null,0);
            expect(h).toHaveLength(3);

        })
        test("Name is not expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,null,1)).resolves.toEqual([]);
            
        })

    });

    describe("Avg price",()=>{
        test("Location AvgPrice expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,null,null,1)).resolves.not.toEqual(null);
            let h= await Huts.getHutsFilters(null,null,null,null,null,1);
            expect(h).toHaveLength(3);

        })
        test("tooLow abgPrice is not expected",async()=>{
            await expect(Huts.getHutsFilters(null,null,null,null,null,-1)).resolves.toEqual([]);
            
        })

    });
    

})

describe("Set Hut description",()=>{
    test("set",async()=>{
        await Huts.emptyHuts();
        await Huts.addHut(hut);
        await expect(Huts.setHutDescription("a Description",1)).resolves.toEqual({'message': "Description set"})
        let h= await Huts.getHuts();
        h=h[0];
        expect(h).toHaveProperty('Description');
        expect(h.Description).toEqual('a Description');
    
    })
   
    

});



