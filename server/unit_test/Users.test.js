const Users = require('../modules/Users');
const db = require("../modules/DB");

beforeAll(async() =>{   
    await db.createConnection();
    await Users.emptyUsers();
   }
)
afterAll(async()=>{
   await Users.emptyUsers();
} )


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
        await expect(Users.getUsers()).resolves.not.toEqual([ ]);
        let u= await Users.getUsers();
        expect(u).toHaveLength(1);
        expect(u[0]).toHaveProperty('Hash')
        expect(u[0].Hash).toEqual("1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe")
        expect(u[0]).toHaveProperty('Id')
        expect(u[0].Id).toEqual("b@polito.it")
        expect(u[0]).toHaveProperty('Role')
        expect(u[0].Role).toEqual("h")
        expect(u[0]).toHaveProperty('Salt')
        expect(u[0].Salt).toEqual("1234")

    
    });

    test('register a new user', async()=>{
        await expect(Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial')).resolves.toEqual('User created correctly');
        await expect(Users.getUsers()).resolves.not.toEqual([ ]);
        let u= await Users.getUsers();
        expect(u).toHaveLength(1);
        expect(u[0]).toHaveProperty('Hash')
        expect(u[0].Hash).toEqual("hashNoCHecks")
        expect(u[0]).toHaveProperty('Id')
        expect(u[0].Id).toEqual("mail@123.com")
        expect(u[0]).toHaveProperty('Role')
        expect(u[0].Role).toEqual("roleTrial")
        expect(u[0]).toHaveProperty('Salt')
        expect(u[0].Salt).toEqual("1235")
        expect(u[0]).toHaveProperty('code')
        expect(u[0]).toHaveProperty('verified')
    });
    

});