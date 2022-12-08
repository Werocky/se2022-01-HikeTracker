const  PL = require('../modules/ParkingLot');
const db = require("../modules/DB");
const {ParkingLot}= require('../modules/ParkingLot');

beforeAll(async() =>{   
    await db.createConnection();
    await PL.emptyParkingLot();
});
afterAll(async() =>{   
    await PL.emptyParkingLot();
});

const testPL = new ParkingLot(1,"Associated@guide.fake",1,123);
describe("ParkingLot Tests",()=>{
    beforeEach(async() =>{   
        await PL.emptyParkingLot();
    });
    afterEach(async() =>{   
        await PL.emptyParkingLot();
    });
    describe("Add/Delete ParkingLot",()=>{
        it("Add a new ParkingLot",async()=>{
            await expect(PL.getParkingLots()).resolves.toEqual([]);
            await expect(PL.createParkingLot(testPL)).resolves.toEqual('Parking lot created');
            let P = await PL.getParkingLot(1);
            expect(P).not.toEqual([]);
            expect(P).toHaveProperty('ParkingID');
            expect(P.ParkingID).toEqual(1);
            expect(P).toHaveProperty('AssociatedGuide');
            expect(P.AssociatedGuide).toEqual("Associated@guide.fake");
            expect(P).toHaveProperty('NumAuto');
            expect(P.NumAuto).toEqual(123);
            expect(P).toHaveProperty('Free');
            expect(P.Free).toEqual(1);

        })
        it("delete a parking lot",async()=>{
            await expect(PL.getParkingLot(1)).resolves.not.toEqual([]);
            await expect(PL.deleteParkingLot(1)).resolves.toEqual('Entry deleted')
            await expect(PL.getParkingLots()).resolves.toEqual([]);
        })
    })
    it("Update ParkingLot",async()=>{
        await PL.createParkingLot(testPL);
        let P = await PL.getParkingLot(1);
        expect(P).not.toEqual([]);
        expect(P).toHaveProperty('ParkingID');
        expect(P.ParkingID).toEqual(1);
        expect(P).toHaveProperty('AssociatedGuide');
        expect(P.AssociatedGuide).toEqual("Associated@guide.fake");
        expect(P).toHaveProperty('NumAuto');
        expect(P.NumAuto).toEqual(123);
        expect(P).toHaveProperty('Free');
        expect(P.Free).toEqual(1);

       await expect(PL.updateParkingLot(1,'a description',0)).resolves.toEqual('Entry Updated Correctly')
       P = await PL.getParkingLot(1);
       expect(P).not.toEqual([]);
       expect(P).toHaveProperty('ParkingID');
       expect(P.ParkingID).toEqual(1);
       expect(P).toHaveProperty('AssociatedGuide');
       expect(P.AssociatedGuide).toEqual("Associated@guide.fake");
       expect(P).toHaveProperty('NumAuto');
       expect(P.NumAuto).toEqual(123);
       expect(P).toHaveProperty('Free');
       expect(P.Free).toEqual(0);
       await expect(PL.getLastParkingID()).resolves.toEqual(1);
    })
    
});