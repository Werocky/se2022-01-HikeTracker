'use strict';

const db = require('./DB').db;

exports.addReferencePoint = (RefPointID, lat, lng, type) => {
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO ReferencePoints(RefPointID, Lat, Lng, Type) VALUES (?,?,?,?);";
    db.run(sql, [RefPointID, lat, lng, type], function (err) {
      if (err)
        reject(err);
      else {
        resolve("New RefPoint added");
      }
    });
  });
};

exports.updateReferencePoint = (RefPointID, lat, lng, type) =>{
  return new Promise(async (resolve, reject) =>{
    const sql = 'UPDATE ReferencePoints SET lat = ?, lng = ?, type = ? WHERE RefPointID = ?';
    db.run(sql, [lat, lng, type, RefPointID], function (err){
      if(err)
        reject(err);
      else
        resolve('Entry updated');
    })
  })
}

exports.emptyReferencePoint = () => {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM ReferencePoints;", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('ReferencePoints emptied');
    });
  })
}