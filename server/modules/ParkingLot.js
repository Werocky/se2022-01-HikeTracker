'use strict';

const db = require('./DB').db;
class ParkingLot{
    constructor(
        ParkingID,
        AssociatedGuide,
        Free,
        NumAuto
    ){
        this.ParkingID=ParkingID;
        this.AssociatedGuide=AssociatedGuide;
        this.Free=Free;
        this.NumAuto=NumAuto;
    }
}

function createParkingLot(ParkingLot){
    return new Promise (async (resolve, reject) =>{
        const sql = 'INSERT INTO ParkingLots(ParkingID, AssociatedGuide, Free, NumAuto) VALUES(?, ?, ?, ?)';
        db.run(sql, [ParkingLot.ParkingID, ParkingLot.AssociatedGuide, ParkingLot.Free, ParkingLot.NumAuto], function (err){
            if(err)
                reject(err);
            else
                resolve('Parking lot created');
        })
    })
}

function updateParkingLot(id, description, free){
    return new Promise(async (resolve, reject) =>{
        try{
            await queryUpdateParkingLotRP(id, description);
            await queryUpdateParkingLot(id,free);
            resolve('Entry Updated Correctly')
        }catch(err){
            // undo changes if wanted
            reject(err);
        }
        
       
    })
}
///:private functions to update in 1 call the parking lot
function queryUpdateParkingLot(id,free){    
    return new Promise(async(resolve,reject)=>{
        const sql = 'UPDATE ParkingLots SET Free = ? WHERE ParkingID = ?';
        db.run(sql, [free, id], function (err){
            if(err)
                reject(err);
            else
                resolve("Entry updated")
        })
    })
}
function queryUpdateParkingLotRP(id,description){
    return new Promise(async(resolve,reject)=>{
        const sql= "UPDATE ReferencePoints SET description = ? WHERE RefPointID =?";
        db.serialize(function(){
            db.run(sql,[description,id],(err)=>{
                if(err)reject(err);
                else resolve('referencePoints updated');
            })
        })
    })
}
///://
function getParkingLots(){
    return new Promise(async (resolve, reject) =>{
        const sql = 'SELECT * FROM ParkingLots';
        db.all(sql, [], function (err, rows) {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function getParkingLot(id){
    return new Promise(async (resolve, reject) =>{
        const sql = 'SELECT * FROM ParkingLots WHERE ParkingID = ?';
        db.get(sql, [id], function (err, rows) {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function deleteParkingLot(id){
    return  new Promise(async (resolve, reject) =>{
        const sql = 'DELETE FROM ParkingLots WHERE ParkingID = ?';
        db.run(sql, [id], function (err){
            if (err)
                reject(err);
            else
                resolve('Entry deleted');
        })
    })
}

function emptyParkingLot() {
    return new Promise(async (resolve, reject) => {
        db.run("DELETE FROM ParkingLots;", [], function (err) {
          if (err)
            reject(err);
          else
            resolve('ParkingLots emptied');
        });
      })
}

function getLastParkingID(){
    return new Promise(async (resolve, reject) =>{
        const sql = "SELECT MAX(ParkingID) AS PID FROM ParkingLots";
        db.get(sql, [], function (err, rows) {
            if(err)
                reject(err);
            else{
                if(rows === null || rows === undefined)
                    rows = 0;
                resolve(rows.PID);
            }
        })
    })
}

function connectParkingToHike(RefPointID,HikeID,IsStart=0,IsEnd=0){
    const referencePoints= require("./HikeRefPoints").addHikeRefPoints;
    return new Promise(async(resolve, reject)=>{
        try{
            let returnmsg =await  referencePoints(HikeID,RefPointID,IsStart,IsEnd);
            resolve(returnmsg);    
        }catch(err){
            reject(err);
        }

    })
}

module.exports = {
    ParkingLot,
    createParkingLot,
    updateParkingLot,
    getParkingLots,
    getParkingLot,
    deleteParkingLot,
    emptyParkingLot,
    connectParkingToHike,
    getLastParkingID
};