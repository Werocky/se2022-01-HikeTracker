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
        const hikes = rows.map((r) => ({ HikeID: r.HikeID, City: r.City, Province: r.Province, start: r.Start, end: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}));
        resolve(hikes);
      });
    });
  };

exports.setDescription=(Description, HikeID)=>{
  return new Promise(async (resolve, reject) => {
    db.run("UPDATE Hikes SET Description = ? WHERE HikeID = ?",
        [Description, HikeID], function (err) {
            if (err)
                reject(err);
            else
                resolve(`Description added for Hike ${HikeID}`);
        });
  });
}  

exports.addHike=(HikeID, Province, City, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description)=>{
  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (HikeID, Province, City, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [HikeID, Province, City, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description], function (err) {
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
