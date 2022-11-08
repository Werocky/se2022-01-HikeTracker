'use strict';

const db = require('./DB').db;

//get hikes





exports.getHikes = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}));
        resolve(hikes);
      });
    });
  };


exports.addHike=(HikeID, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description)=>{
  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (HikeID, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [HikeID, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description], function (err) {
            if (err)
                reject(err);
            else
                resolve('New Hike inserted');
        });
});
}  

  exports.deleteHikes=()=>{
    return new Promise(async (resolve, reject) => {
      db.run("DELETE FROM Hikes", [], function (err) {
          if (err)
              reject(err);
          else
              resolve('Hikes emptied');
      });
  })
  }
