'use strict';

const db = require('./DB').db;


//get hikes

const acceptableFilters = ['HikeID', 'Length', 'ExpectedTime', 'Ascent', 'Difficulty', 'Start', 'End', 'Title', 'Province', 'City'];



exports.getHikes = () => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Hikes';
    db.all(sql, [], (err, rows) => {
      if (err) {
        //console.log('/rejected');
        reject(err);
      }
      //console.log(rows);
      const hikes = rows.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description }));
      resolve(hikes);
    });
  });
};

exports.getHike = (hikeID) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Hikes JOIN HikeLocations ON Hikes.HikeID = HikeLocations.HikeID WHERE Hikes.HikeID = ?';

    db.get(sql, [hikeID], (err, row) => {
      if (err) {
        reject(err);
      }
      //console.log("Row: "+row);
      if (row) {
        const hike = { HikeID: row.HikeID, Start: row.Start, End: row.End, Title: row.Title, Length: row.Length, ExpectedTime: row.ExpectedTime, Ascent: row.Ascent, Difficulty: row.Difficulty, Description: row.Description, Province: row.Province, City: row.City };
        resolve(hike);
      } else reject('undefined row');

    });
  });
};

exports.setDescription = (Description, HikeID) => {
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

exports.addHike = (HikeID, Title, Length, ExpectedTime, Ascent, Difficulty, Start, End, Description) => {
  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (HikeID,Title, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [HikeID, Title, Length, ExpectedTime, Ascent, Difficulty, Start, End, Description], function (err) {
        if (err)
          reject(err);
        else
          resolve('New Hike inserted');
      });
  });
}

exports.deleteHikes = () => {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM Hikes", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('Hikes emptied');
    });
  })
}
/*
It Allows to set a specific filter if MaxValue is not specified or a range if a max value is set
 */
exports.getHikesByFilter = (filterType, filterMinValue=-8000, MaxValue = null) => {
  return new Promise(
    async (resolve, reject) => {
      //console.log(filterType, filterMinValue, MaxValue);
      if (acceptableFilters.includes(filterType)) {
        if (MaxValue == null) {
          if (filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent') {
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + '>= ?'
            //console.log(sql);
            db.all(sql, [filterMinValue], (err, rows) => {
              //console.log("rows:"+rows);
              if (err) reject(err);
              else {
                const hikes = rows.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description }));
                resolve(hikes);
              }
            });
          } else {
            let sql = '';
            if (filterType != 'Province' && filterType != 'City') {
              sql = 'SELECT * FROM Hikes WHERE Hikes.' + filterType + ' = ?'

            } else {
              sql = 'SELECT * FROM Hikes JOIN HikeLocations ON Hikes.HikeID = HikeLocations.HikeID WHERE HikeLocations.' + filterType + ' = ?'
            }
            //console.log(sql);

            db.all(sql, [filterMinValue], (err, rows) => {
              if (err) reject(err);
              else {

                const hikes = rows.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description }));

                resolve(hikes);

              }
            });
          }
        } else {
          if (filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent') {
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + ' <= ? AND ' + filterType + ' >= ?'
            //console.log(sql);
            db.all(sql, [MaxValue, filterMinValue], (err, rows) => {
              if (err) reject(err);
              else {
                const hikes = rows.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description }));
                resolve(hikes);
              }
            });
          } else {
            reject('problem deciphering data')
          }
        }
      } else reject('No such field');

    }
  );
}

