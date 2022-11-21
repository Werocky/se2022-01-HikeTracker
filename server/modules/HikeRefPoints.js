'use strict';

const db = require('./DB').db;

exports.addHikeRefPoints = (HikeID, RefPointID, IsStart, IsEnd) => {
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO HikeRefPoints(HikeID, RefPointID, IsStart, IsEnd) VALUES (?,?,?,?)";
    db.run(sql, [HikeID, RefPointID, IsStart, IsEnd], function (err) {
      if (err)
        reject(err);
      else {
        resolve("New HikeRefPoint added");
      }
    });
  });
};

exports.emptyHikeRefPoint = () => {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM HikeRefPoints", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('HikeRefPoints emptied');
    });
  })
};

