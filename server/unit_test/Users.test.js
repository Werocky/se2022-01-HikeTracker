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
    test('set/ check verification', async()=>{
        await expect(Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial','code')).resolves.toEqual('User created correctly');
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
        expect(u[0].code).toEqual("code")
        expect(u[0]).toHaveProperty('verified')
       // expect(u[0].verified).toEqual(0)

        await expect(Users.setVerified("mail@123.com")).resolves.toEqual('User verified correctly');
        await expect(Users.getUsers()).resolves.not.toEqual([ ]);
        u= await Users.getUsers();
        expect(u[0]).toHaveProperty('verified')
        expect(u[0].verified).toEqual(1)

    });

    test('fail set verification(wrong user)', async()=>{
        await expect(Users.getUsers()).resolves.toEqual([ ]);

        await expect(Users.setVerified("mail@123.com")).resolves.not.toEqual(null);
        
    });
    test('fail add new user (already existent user)', async()=>{
        await expect(Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial','333')).resolves.toEqual('User created correctly');
        await expect(Users.register("hashNoCHecks2",'12352','mail@123.com','roleTrial2','2333')).rejects.not.toEqual(null);

        
    });

    test('get specific user',async()=>{
        await expect(Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial',123)).resolves.toEqual('User created correctly');
        await expect(Users.getUserById('mail@123.com')).resolves.not.toEqual([ ]);
        let u= await Users.getUserById('mail@123.com');
       
        expect(u).toHaveProperty('Id')
        expect(u.Id).toEqual("mail@123.com")
        expect(u).toHaveProperty('code')
        expect(u.code).toEqual(123)
        expect(u).toHaveProperty('verified')
        expect(u.verified).toEqual(0)
    })
    describe('Check verification code',()=>{
        beforeEach(async ()=>{
            await Users.register("hashNoCHecks",'1235','mail@123.com','roleTrial',123);
            await Users.setVerificationCode(123,"mail@123.com");
            await Users.register("hashN2",'12352','mail2@123.com','roleTrial',0);

        })
        test('correct code',async()=>{
            await expect(Users.checkVerificationCode(123,"mail@123.com")).resolves.not.toEqual(null)
            let u=await Users.checkVerificationCode(123,"mail@123.com");
            expect(u).toHaveProperty('code')
            expect(u.code).toEqual(123)
            expect(u).toHaveProperty('Id')
            expect(u.Id).toEqual("mail@123.com")
        })  
        test('wrong code',async()=>{
            await expect(Users.checkVerificationCode('0',"mail2@123.com")).rejects.toEqual("invalid code")
            await expect(Users.checkVerificationCode('111',"mail@123.com")).rejects.toEqual("invalid code")


        })  
    })
    

});