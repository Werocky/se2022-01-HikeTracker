'use strict';

const db = require('./DB').db;

exports.addReferencePoint = (lat, lng, type) => {
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO ReferencePoints(Lat, Lng, Type) VALUES (?,?,?);";
    db.run(sql, [lat, lng, type], function (err) {
      if (err)
        reject(err);
      else {
        resolve("New RefPoint added");
      }
    });
  });
};
exports.getReferencePointIDByCoords=(la,lng)=>{
  return new Promise(async(resolve,reject)=>{
    db.get('SELECT RefPointID FROM ReferencePoints WHERE Lat = ? AND Lng = ?',[la,lng],(err,row)=>{
      if(err)reject('error geting ID: '+err);
      else resolve(row.RefPointID)
    })
  });
  
}

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

exports.getStartingPoints = () => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT PointsOfHike.HikeID, Lat, Lng FROM PointsOfHike JOIN ReferencePoints ON PointsOfHike.PointID = ReferencePoints.RefPointID WHERE IsStart=1;";
    db.all(sql, [], function (err, rows) {
      if (err)
        reject(err);
      else {
        const points = rows.map((r) => ({ HikeID: r.HikeID, Lat: r.Lat, Lng: r.Lng }));
        resolve(points);
      }
    });
  })
};

exports.getFromType = (type) => {
  return new Promise(async (resolve, reject) => {
    const sql="SELECT RefPointID FROM ReferencePoints WHERE Type=?;";
    db.all(sql, [type],function (err,rows) {
      if(err)
      reject(err);
      else {
        const hutPoints = rows.map((r)=> ({RefPointID: r.RefPointID}));
        // console.log(hutPoints);
        resolve(hutPoints);
      }
    })
  })
}

exports.getLastRefPointID = () => {
  return new Promise(async (resolve, reject) =>{
    const sql = "SELECT RefPointID FROM ReferencePoints ORDER BY RefPointID DESC LIMIT 1";
    db.get(sql,  (err, row)=> {
      if(err)
        reject(err);
      else
        resolve(row == undefined ? 0: row.RefPointID);
    })
  })
}

exports.getHutsAndParkingLots = () =>{
  return new Promise(async (resolve, reject) =>{
    const sql = "SELECT RP.RefPointID, H.Name, PL.Description, RP.Type FROM ReferencePoints RP, ParkingLots PL Huts H WHERE RP.RefPointID = Huts.RefPointID AND PL.ParkingID = RF.PointID AND (Type = 'hut' OR Type = 'parking')";
    db.all(sql, [], function (err, rows) {
      if(err)
        reject(err)
      else{
        const points = rows.map((r) => ({ RefPointID: r.RefPointID, Type: r.Type, Description: r.Description, Name: r.Name }));
        resolve(points);
      }
    })
  })
}