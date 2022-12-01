'use strict';

const db = require('./DB').db;


//get hikes

const acceptableFilters = ['HikeID', 'Length', 'ExpectedTime', 'Ascent', 'Difficulty', 'Start', 'End', 'Title', 'Region', 'City'];
//can be called from APIS to construct a new Hike

class hike{
  constructor(
    HikeID,
    Title,
    Length,
    Description,
    Ascent,
    Difficulty,
    ExpectedTime,
    Country,
    Region,
    Province,
    City,
    GpxFile,
    Start,
    End,
    AssociatedGuide
  ){
    this.HikeID=HikeID;
    this.Title=Title;
    this.Length=Length;
    this.Description=Description;
    this.Ascent=Ascent;
    this.Difficulty=Difficulty;
    this.ExpectedTime=ExpectedTime
    this.Country=Country
    this.Region=Region
    this.Province=Province
    this.City=City
    this.GpxFile=GpxFile
    this.Start=Start
    this.End=End
    this.AssociatedGuide=AssociatedGuide

  }
}

 function getHikes  () {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes order by Title';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  };

 function getHike  (hikeID)  {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Hikes WHERE Hikes.HikeID = ?';

    db.get(sql, [hikeID], (err, row) => {
      if (err) {
        reject(err);
      }
      if (row) {
        resolve(row);
      } else reject('undefined row');

    });
  });
};

 function getLastHikeId  () {
  return new Promise((resolve,reject) => {
    const sql="SELECT HikeID FROM Hikes;";
    db.all(sql,[],(err,rows) => {
      if (err) {
        reject(err);
      }
      const hikes = rows.map((r) => ({ HikeID: +r.HikeID}));
      let last = 0;
      hikes.forEach(h => {if(h.HikeID > last) last = h.HikeID})
      resolve(last);
    });
  });
};

 function setDescription  (Description, HikeID)  {
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

 function addHike (Hike)  {

  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (Title, Length, ExpectedTime, Ascent, Difficulty, Start, End, Description, Country, Region, Province, City, GpxFile, AssociatedGuide ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [Hike.Title, Hike.Length, Hike.ExpectedTime, Hike.Ascent, Hike.Difficulty, Hike.Start, Hike.End, Hike.Description, Hike.Country, Hike.Region, Hike.Province, Hike.City, Hike.GpxFile, Hike.AssociatedGuide ], function (err) {
        if (err)
          reject(err);
        else
          resolve('New Hike inserted');
      });
  });
}

 function deleteHikes ()  {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM Hikes", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('Hikes emptied');
    });
  })
}

 function editStartEndPoints  (start, end, id)  {
  return new Promise(async (resolve, reject) =>{
    const sql = "UPDATE Hikes SET Start = ?, End = ? WHERE HikeID = ?";
    db.run(sql, [start, end, id], function (err){
      if(err)
        reject(err)
      else
        resolve("Hike's start and end points updated.");
    });
  })
}
/*
It Allows to set a specific filter if MaxValue is not specified or a range if a max value is set
 */
 function getHikesByFilter  (filterType, filterMinValue=-8000, MaxValue = null)  {
  return new Promise(
    async (resolve, reject) => {
      
      if (acceptableFilters.includes(filterType)) {
        if (MaxValue == null) {
          if (filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent') {
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + '>= ?'
            
            db.all(sql, [filterMinValue], (err, rows) => {
              
              if (err) reject(err);
              else {
               
                resolve(rows);
              }
            });
          } else {
            let sql = '';
            if (filterType != 'Region' && filterType != 'City') {
              sql = 'SELECT * FROM Hikes WHERE Hikes.' + filterType + ' = ?'

            } else {
              sql = 'SELECT * FROM Hikes WHERE Hikes.' + filterType + ' = ?'
            }
            

            db.all(sql, [filterMinValue], (err, rows) => {
              if (err) reject(err);
              else {

                resolve(rows);

              }
            });
          }
        } else {
          if (filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent') {
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + ' <= ? AND ' + filterType + ' >= ?'
            
            db.all(sql, [MaxValue, filterMinValue], (err, rows) => {
              if (err) reject(err);
              else {
                resolve(rows);
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

module.exports={
  getHike,
  getHikes,
  getHikesByFilter,
  getLastHikeId,
  setDescription,
  addHike,
  deleteHikes,
  editStartEndPoints,
  hike

}