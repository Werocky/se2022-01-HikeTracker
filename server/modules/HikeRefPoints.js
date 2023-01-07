'use strict';

const db = require('./DB').db;

function addHikeRefPoints(HikeID, RefPointID, IsStart, IsEnd) {
  return new Promise(async (resolve, reject) => {
    const sql = "INSERT INTO PointsOfHike(HikeID, PointID, IsStart, IsEnd) VALUES (?,?,?,?)";
    db.run(sql, [HikeID, RefPointID, IsStart, IsEnd], function (err) {
      if (err) {
        if (err.errno == 19)
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

function deleteHikeRefPoint(HikeID, RefPointID) {
  return new Promise(async (resolve, reject) => {
    const sql = "DELETE FROM PointsOfHike WHERE HikeID=? AND PointID=?;";
    db.run(sql, [HikeID, RefPointID], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("HikeRefPoint Deleted");
      }
    });
  });
}

function getHutsAndParks() {
  return new Promise(async (resolve, reject) => {
    const sql = 'SELECT RP.RefPointID, RP.Type, H.Name FROM ReferencePoints RP LEFT JOIN ParkingLots PL ON RP.RefPointID = PL.ParkingID LEFT JOIN Huts H ON RP.RefPointID = H.RefPointID WHERE (RP.Type = ? OR RP.Type = ?)';
    db.all(sql, ["hut", "parking"], function (err, rows) {
      if (err)
        reject(err);
      else {
        const info = rows.map((r) => ({ RefPointID: r.RefPointID, Type: r.Type, Name: r.Name, Description: r.description }));
        resolve(info);
      }
    })
  })
}

function getHikeInfo(HikeID) {
  return new Promise(async (resolve, reject) => {
    const sql = 'SELECT * FROM PointsOfHike HRP, ReferencePoints RP, Hikes H WHERE H.HikeID = HRP.HikeID AND HRP.PointID = RP.RefPointID AND H.HikeID = ?';
    db.all(sql, [HikeID], function (err, rows) {
      if (err)
        reject(err);
      else {
        const hikes = rows.map((r) => ({ HikeID: r.HikeID, RefPointID: r.PointID, IsStart: r.IsStart, IsEnd: r.IsEnd, Lat: r.Lat, Lng: r.Lng, Type: r.Type, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Start: r.Start, End: r.End, Description: r.Description }));

        resolve(hikes);

      }
    })
  })
}

function getHikeRefPoints(HikeID) {
  return new Promise(async (resolve, reject) => {
    const sql = 'SELECT RP.Lat, RP.Lng, RP.Type, RP.RefPointID, PH.IsStart, PH.IsEnd FROM PointsOfHike PH LEFT OUTER JOIN ReferencePoints RP ON PH.PointID = RP.RefPointID WHERE PH.HikeID=? ';
    db.all(sql, [HikeID], function (err, rows) {
      if (err)
        reject(err);
      else {
        const hikes = rows.map((r) => ({ RefPointID: r.RefPointID, IsStart: r.IsStart, IsEnd: r.IsEnd, Lat: r.Lat, Lng: r.Lng, Type: r.Type }));

        resolve(hikes);

      }
    })
  })
}

function emptyAllPoints() {
  this.emptyHikeRefPoint();
  this.emptyReferencePoints();
}

function emptyReferencePoints() {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM ReferencePoints", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('ReferencePoints emptied');
    });
  })
}

function emptyHikeRefPoint() {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM PointsOfHike", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('ReferencePoints emptied');
    });
  })
};

function setIsStart(HikeID, IsStart, RefPointID) {
  return new Promise(async (resolve, reject) => {
    const sql = 'UPDATE PointsOfHike SET IsStart = ? WHERE HikeID = ? AND PointID = ?';
    db.run(sql, [IsStart, HikeID, RefPointID], function (err) {
      if (err)
        reject(err);
      else
        resolve('Is Start setted');
    })
  })
}

function setIsEnd(HikeID, IsEnd, RefPointID) {
  return new Promise(async (resolve, reject) => {
    const sql = 'UPDATE PointsOfHike SET IsEnd = ? WHERE HikeID = ? AND PointID = ?';
    db.run(sql, [IsEnd, HikeID, RefPointID], function (err) {
      if (err)
        reject(err);
      else
        resolve('Is End setted');
    })
  })
}


function IsLastPoint(HikeID, PointID) {
  return new Promise(async (resolve, reject) => {
    let points = await getHikeInfo(HikeID);

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (point.RefPointID == PointID) {
        resolve(point.IsEnd == 1);
      }
    }
    resolve(false);

  });

}

function IsFirstPoint(HikeID, PointID) {
  return new Promise(async (resolve, reject) => {
    let points = await getHikeInfo(HikeID);

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (point.RefPointID == PointID) {
        resolve(point.IsEnd == 1);
      }
    }
    resolve(false);

  });

}

module.exports = {
  setIsEnd,
  setIsStart,
  emptyAllPoints,
  emptyHikeRefPoint,
  emptyReferencePoints,
  addHikeRefPoints,
  deleteHikeRefPoint,
  getHutsAndParks,
  getHikeInfo,
  getHikeRefPoints,
  IsLastPoint,
  IsFirstPoint
}