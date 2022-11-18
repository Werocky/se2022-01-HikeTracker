const Users = require('../modules/Users');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await
    await Users.emptyUsers();
   },10000 
)
afterAll(async()=>{
   await Users.emptyUsers();
   await db.populate();
   
},10000 )

describe("Get/add HikeUsers",()=>{
    beforeEach(async() =>{   
        await Users.emptyUsers();
       } 
    )
    afterEach(async()=>{
       await Users.emptyUsers();
       
    })
    test('Get all Users empty db',async()=>{
        await expect(Users.getUsers()).resolves.toEqual([]);
    });
    test('Get all Users',async()=>{
        await expect(Users.register("1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe",
        "1234","b@polito.it", "h")).resolves.toEqual('User created correctly');
        await expect(Users.getUsers()).resolves.toEqual([
            {
                "Hash": "1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe",
                "Id": "b@polito.it",
                "Role": "h",
                "Salt": "1234",
            },
        ]);
    });

    test('register a new user', async()=>{
        await expect(Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial')).resolves.toEqual('User created correctly');
        await expect(Users.getUsers()).resolves.toEqual([  
            {
                "Hash": "hashNoCHecks",
                "Id": "mail@123.com",
                "Role": "roleTrial",
                "Salt": "1235",
            },    
        ])
    });
    

});