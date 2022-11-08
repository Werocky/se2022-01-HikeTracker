'use strict';

const db = require('./DB').db;

/*class Hike{
    constructor(){

    }
}*/
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

//get filtered hikes
exports.getFilteredHikes = (filters) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes WHERE MapId=? AND Difficulty=? AND Ascent=? AND ExpectedTime=?';
      db.all(sql, [filters.MapId, filters.Difficulty, filters.Ascent, filters.ExpectedTime], (err, rows) => {
        if (err) {
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}));
        resolve(hikes);
      });
    });
  };

