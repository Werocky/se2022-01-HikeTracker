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