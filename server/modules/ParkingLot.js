'use strict';

const db = require('./DB').db;

function createParkingLot(id, description, free){
    return new Promise (async (resolve, reject) =>{
        const sql = 'INSERT INTO ParkingLots(id, description, free) VALUES(?, ?, ?)';
        this.db.run(db, [id, description, free], function (err){
            if(err)
                reject(err);
            else
                resolve('Parking lot created');
        })
    })
}

function updateParkingLot(id, description, free){
    return new Promise(async (resolve, reject) =>{
        const sql = 'UPDATE ParkingLots SET description = ?, free = ? WHERE id = ?';
        this.db.run(db, [description, free, id], function (err){
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
        this.db.all(db, [], function (err, rows) {
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
        this.db.run(db, [id], function (err, rows) {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}



function deleteParkingLot(id){
    return  new Promise(async (resolve, reject) =>{
        const sql = 'DELETE FROM ParkingLots WHERE id = ?';
        this.db.run(db, [id], function (err){
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
            else
                resolve(rows);
        })
    })
}

module.exports = {createParkingLot, updateParkingLot, getParkingLots, getParkingLot, deleteParkingLot, emptyParkingLot, getLastParkingID};