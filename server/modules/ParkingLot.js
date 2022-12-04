'use strict';

const db = require('./DB').db;
class ParkingLot{
    constructor(
        ParkingLotID,
        AssociatedGuide,
        Free
    ){
        this.ParkingLotID=ParkingLotID;
        this.AssociatedGuide=AssociatedGuide;
        this.Free=Free;
    }
}

function createParkingLot(ParkingLot){
    return new Promise (async (resolve, reject) =>{
        const sql = 'INSERT INTO ParkingLots(AssociatedGuide, Fee) VALUES(?, ?)'; //, NumAuto param needed, adjust DataBase
        db.run(sql, [ParkingLot.AssociatedGuide, ParkingLot.Free/*, ParkingLot.NumAuto*/], function (err){
            if(err)
                reject(err);
            else
                resolve('Parking lot created');
        })
    })
}

function updateParkingLot(id, description, free){
    return new Promise(async (resolve, reject) =>{
        const sql = 'UPDATE ParkingLots SET Description = ?, Free = ? WHERE ParkingID = ?';
        db.run(sql, [description, free, id], function (err){
            if(err)
                reject(err);
            else
                resolve("Entry updated")
        })
    })
}

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
        const sql = 'SELECT * FROM ParkingLots WHERE ParkingId = ?';
        db.run(sql, [id], function (err, rows) {
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
        this.db.run(sql, [id], function (err){
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
        const sql = "SELECT MAX(ParkingID) FROM ParkingLots";
        db.run(sql, [], function (err, rows) {
            if(err)
                reject(err);
            else{
                if(rows === null || rows === undefined)
                    rows = 0;
                resolve(rows);
            }
        })
    })
}

module.exports = {createParkingLot, updateParkingLot, getParkingLots, getParkingLot, deleteParkingLot, emptyParkingLot, getLastParkingID};