const db = require("../modules/DB");
const Files= require("../modules/FileNames");

beforeAll(async()=>{
    await db.createConnection();
    await Files.emptyConnection();
})
afterAll(async()=>{
    await Files.emptyConnection();
},db.timeout)
describe("Get/Set new Files",()=>{
    test("Get an empty list",async()=>{
        await expect(Files.getFiles()).resolves.toEqual([])
    });

    describe("Add a file",()=>{
        beforeEach(async ()=>{
            await Files.emptyConnection();
        })
        afterEach(async ()=>{
            await Files.emptyConnection();
        })
        test("add a File to the db",async()=>{
            await expect(Files.getFiles()).resolves.toEqual([]);
            await expect(Files.addFile(0,"fakePath.gpx")).resolves.toEqual('New file path added');
        })

        test("Get a File from the db",async()=>{
            await expect(Files.getFiles()).resolves.toEqual([]);
            await expect(Files.addFile(0,"fakePath.gpx")).resolves.toEqual('New file path added');
            await expect(Files.getFileName(0)).resolves.not.toEqual(null);
            
            let file= await Files.getFileName(0);

            expect(file).toEqual('fakePath.gpx');
            
        })

        test("add a File to the db",async()=>{
            await expect(Files.getFiles()).resolves.toEqual([]);
            await expect(Files.addFile(0,"fakePath.gpx")).resolves.toEqual('New file path added');
            await expect(Files.getFiles()).resolves.not.toEqual([]);
            let f=await Files.getFiles();
            expect(f).toHaveLength(1);
            expect(f[0]).toHaveProperty('HikeID');
            expect(f[0].HikeID).toEqual(0);
            expect(f[0]).toHaveProperty('FileName');
            expect(f[0].FileName).toEqual("fakePath.gpx");
        
        })
        test("add a File to the db with incorrect HikeID",async()=>{
            await expect(Files.getFiles()).resolves.toEqual([]);
            await expect(Files.addFile(0,"fakePath.gpx")).resolves.toEqual('New file path added');
            await expect(Files.addFile(0,"fakePath2.gpx")).rejects.not.toEqual(null);

        })

        test("add more than 1 File to the db",async()=>{
            await expect(Files.getFiles()).resolves.toEqual([]);
            for (let i = 0; i < 3; i++) {
                   let path = "FakePath"+i+".gpx";          
                await expect(Files.addFile(i,path)).resolves.toEqual('New file path added');
            }
            
            await expect(Files.getFiles()).resolves.not.toEqual([]);
            let files=await Files.getFiles();

            expect(files).toHaveLength(3);
            
            files.forEach(f => {
                expect(f).toHaveProperty('HikeID');
                expect(f).toHaveProperty('FileName');
                expect(f.FileName).toEqual("FakePath"+f.HikeID+".gpx");
            });
           
        })



    })

    describe("update a File",()=>{
        beforeEach(async ()=>{
            await Files.emptyConnection();
            for (let i = 0; i < 3; i++) {
                let path = "FakePath"+i+".gpx";          
                await Files.addFile(i,path);
         }
        })
        afterEach(async ()=>{
            await Files.emptyConnection();
        })
        test("UPDATE a existing file",async()=>{
            let f=await Files.getFileName(0);
            expect(f).toEqual("FakePath0.gpx");

            await expect(Files.updateFile(0,"NewFakePath.gpx")).resolves.toEqual('File path updated');

            f=await Files.getFileName(0);
            expect(f).toEqual("NewFakePath.gpx");

            
        })
        
    })

});
