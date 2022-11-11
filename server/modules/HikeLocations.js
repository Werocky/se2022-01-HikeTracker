'use strict';

const db = require('./DB').db;

exports.getHikeLocations = () => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM HikeLocations';
      db.all(sql, [], (err, rows) => {

        if (err) {
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeID: r.HikeID,Province : r.Province, City: r.City}));
        resolve(hikes);
      });
    });
};

exports.getHikeLocationsPerID = (HikeID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM HikeLocations WHERE HikeID=?';
    db.all(sql, [HikeID], (err, rows) => {

      if (err) {
        reject(err);
      }
      const hikes = rows.map((r) => ({ HikeID: r.HikeID,Province : r.Province, City: r.City}));
      resolve(hikes);
    });
  });
};

exports.populateLocations= ()=>{
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO HikeLocations(HikeID, Province, City) VALUES ('1', 'Aosta', 'Cervinia');";
    db.run(sql, [], function (err) {
        if (err)
            reject(err);
        else {
            resolve('Tables filled');
        }
    });
  });
};
exports.addLocation= (hikeID,Province,City)=>{
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO HikeLocations(HikeID, Province, City) VALUES (?,?,?);";
    db.run(sql, [hikeID,Province,City], function (err) {
        if (err)
            reject(err);
        else {
            resolve('New location added');
        }
    });
  });
};

exports.emptyLocations=()=>{
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM HikeLocations", [], function (err) {
        if (err)
            reject(err);
        else
            resolve('HikeLocations emptied');
    });
  })
}