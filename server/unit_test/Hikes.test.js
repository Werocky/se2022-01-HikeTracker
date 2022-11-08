const hikes = require('../modules/Hikes');
const db = require("../modules/DB");

beforeAll(
   async() =>{
    await db.createConnection();
   } 
)
afterAll(async()=>{
    //await db.deleteDB();
})

describe("Get/add Hikes",()=>{
    test('Get all Hikes empty db',async()=>{
        await expect(hikes.getHikes()).resolves.toEqual([]);
    });

    test('insert a new Hike', async()=>{
        await expect(hikes.addHike(0,0,0,0,0,0,0,0)).resolves.toEqual('New Hike inserted')
        await expect(hikes.getHikes()).resolves.not.toEqual([]);
    })

    test('Empty hikes db', async()=>{
        await expect(hikes.deleteHikes()).resolves.toEqual('Hikes emptied');
    })
})