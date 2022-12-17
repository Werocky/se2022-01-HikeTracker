'use strict';

const db = require('./DB').db;

function addHikeRefPoints  (HikeID, RefPointID, IsStart, IsEnd)  {
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO PointsOfHike(HikeID, PointID, IsStart, IsEnd) VALUES (?,?,?,?)";
    db.run(sql, [HikeID, RefPointID, IsStart, IsEnd], function (err) {
      if (err)
        { if(err.errno == 19)
          reject("Linked yet");
          else
          reject(err);
        }
      else {
        resolve("New HikeRefPoint added");
      }
    });
  });
};

function getHutsAndParks () {
  return new Promise(async (resolve, reject) =>{
    const sql = 'SELECT RP.RefPointID, RP.Type, H.Name FROM ReferencePoints RP LEFT JOIN ParkingLots PL ON RP.RefPointID = PL.ParkingID LEFT JOIN Huts H ON RP.RefPointID = H.RefPointID WHERE (RP.Type = ? OR RP.Type = ?)';
    db.all(sql, ["hut", "parking"], function (err, rows) {
      if(err)
        reject(err);
      else{
        const info = rows.map((r) => ({ RefPointID: r.RefPointID, Type: r.Type, Name: r.Name, Description: r.description }));
        resolve(info);
      }
    })
  })
}

function getHikeInfo (HikeID) {
  return new Promise(async (resolve, reject) =>{
    const sql = 'SELECT * FROM PointsOfHike HRP, ReferencePoints RP, Hikes H WHERE H.HikeID = HRP.HikeID AND HRP.PointID = RP.RefPointID AND H.HikeID = ?';
    db.all(sql, [HikeID], function (err, rows) {
      if(err)
        reject(err);
      else{
        const hikes = rows.map((r) => ({ HikeID: r.HikeID, RefPointID: r.PointID, IsStart: r.IsStart, IsEnd: r.IsEnd, Lat: r.Lat, Lng: r.Lng, Type: r.Type, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Start: r.STart, End: r.End, Description: r.Description }));
        
        resolve(hikes);

      }
    })
  })
}

function getHikeRefPoints(HikeID) {
  console.log(HikeID);
  return new Promise(async (resolve, reject) =>{
    const sql = 'SELECT RP.Lat, RP.Lng, RP.Type, RP.RefPointID, PH.IsStart, PH.IsEnd FROM PointsOfHike PH LEFT JOIN  ReferencePoints RP ON RP.RefPointID = PH.PointID WHERE PH.PointID = RP.RefPointID AND PH.HikeID=? ';
    db.all(sql, [HikeID], function (err, rows) {
      if(err)
        reject(err);
      else{
        console.log(rows);
        const hikes = rows.map((r) => ({ RefPointID: r.RefPointID, IsStart: r.IsStart, IsEnd: r.IsEnd, Lat: r.Lat, Lng: r.Lng, Type: r.Type}));
        
        resolve(hikes);

      }
    })
  })
}

function emptyAllPoints(){
   this.emptyHikeRefPoint();
   this.emptyReferencePoints();
}

function emptyReferencePoints(){
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM ReferencePoints", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('ReferencePoints emptied');
    });
  })
}

function emptyHikeRefPoint  ()  {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM PointsOfHike", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('ReferencePoints emptied');
    });
  })
};

function setIsStart  (HikeID, IsStart, RefPointID) {
  return new Promise(async (resolve, reject) =>{
    const sql = 'UPDATE PointsOfHike SET IsStart = ? WHERE HikeID = ? AND PointID = ?';
    db.run(sql, [IsStart, HikeID, RefPointID], function(err) {
      if(err)
        reject(err);
      else
        resolve('Is Start setted');
    })
  })
}

function setIsEnd  (HikeID, IsEnd, RefPointID) {
  return new Promise(async (resolve, reject) =>{
    const sql = 'UPDATE PointsOfHike SET IsEnd = ? WHERE HikeID = ? AND PointID = ?';
    db.run(sql, [IsEnd, HikeID, RefPointID], function(err){
      if(err)
        reject(err);
      else
        resolve('Is End setted');
    })
  })
}
module.exports={
  setIsEnd,
  setIsStart,
  emptyAllPoints,
  emptyHikeRefPoint,
  emptyReferencePoints,
  addHikeRefPoints,
  getHutsAndParks,
  getHikeInfo,
  getHikeRefPoints
}