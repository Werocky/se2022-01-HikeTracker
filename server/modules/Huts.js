'use strict';

const db = require('./DB').db;

exports.addHut = (RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description) => {
  return new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO HUTS(RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql, [
      RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description
    ], function (err) {
      if (err)
        reject(err);
      else
        resolve('Hut added');
    });
  });
};

exports.emptyHuts = () => {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM Huts;", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('Huts emptied');
    });
  })
};