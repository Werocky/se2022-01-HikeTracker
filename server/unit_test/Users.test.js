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
const usr = Users.new("1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe",
"1234","b@polito.it", "h",'code',0,"Name1", "Surname1", 9879879871);
const usr2= Users.new("hashNoCHecks",'1235','mail@123.com','roleTrial',123,0,"NAME0","surname2",123456789)

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

        await expect(Users.register(usr)).resolves.toEqual('User created correctly');
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
        expect(u[0]).toHaveProperty('Name')
        expect(u[0]).toHaveProperty('Surname')
        expect(u[0]).toHaveProperty('Phone')
    });

    test('register a new user', async()=>{
        await expect(Users.register(usr2)).resolves.toEqual('User created correctly');
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
        await expect(Users.register(usr2)).resolves.toEqual('User created correctly');
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
        expect(u[0].code).toEqual(123)
        expect(u[0]).toHaveProperty('verified')

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
        await expect(Users.register(Users.new("hashNoCHecks",'1235','mail@123.com','roleTrial','333',0,"Name","Surname",1223456))).resolves.toEqual('User created correctly');
        await expect(Users.register(Users.new("hashNoCHecks2",'12352','mail@123.com','roleTrial2','2333',0,"Name","Surname",1223456))).rejects.not.toEqual(null);

        
    });

    test('get specific user',async()=>{
        await expect(Users.register(usr2)).resolves.toEqual('User created correctly');
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
            await Users.emptyUsers();
            await Users.register(usr2);
            await Users.setVerificationCode(123,"mail@123.com");
            await Users.register(usr);

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
            await expect(Users.checkVerificationCode(0,"mail@123.com")).rejects.toEqual("invalid code")
            await expect(Users.checkVerificationCode('111',"mail@123.com")).rejects.toEqual("invalid code")


        })  
    })
    

});