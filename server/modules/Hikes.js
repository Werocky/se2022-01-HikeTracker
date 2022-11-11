'use strict';

const db = require('./DB').db;


//get hikes

const acceptableFilters = ['HikeID','Length','ExpectedTime','Ascent', 'Difficulty', 'Start', 'End','Title', 'Province', 'City'];



exports.getHikes = () => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes';
      db.all(sql, [], (err, rows) => {

        if (err) {
          //console.log('/rejected');
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
        resolve(hikes);
      });
    });
};

exports.getHike = (HikeID) => {

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Hikes WHERE HikeID=?';
    db.get(sql, [HikeID], (err, row) => {

      if (err) {
        reject(err);
      }
      const hike = { HikeID: row.HikeID, Start: row.Start, End: row.End, Title: row.Title, Length: row.Length, ExpectedTime: row.ExpectedTime, Ascent: row.Ascent, Difficulty: row.Difficulty, Description: row.Description};
      resolve(hike);
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

exports.addHike=(HikeID, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description)=>{
  return new Promise(async (resolve, reject) => {
    db.run("INSERT INTO Hikes (HikeID,Title, Length, ExpectedTime, Ascent,Difficulty,Start, End, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
/*
It Allows to set a specific filter if MaxValue is not specified or a range if a max value is set
 */
exports.getHikesByFilter=(filterType, filterMinValue, MaxValue=null)=>{
  return new Promise(
    async (resolve,reject)=>{
      //console.log(filterType, filterMinValue, MaxValue);
      //console.log(filterType,filterMinValue,MaxValue,MinValue);
      if(acceptableFilters.includes(filterType)){
        if(MaxValue==null){
          if(filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent'){
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + '>= ?'
            //console.log(sql);
            db.all(sql,[filterMinValue],(err,rows)=>{
              //console.log("rows:"+rows);
              if(err)reject(err);
              else{
                const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
                resolve(hikes);
            }
          });  
          } else {
            let sql ='';
            if(filterType!= 'Province' && filterType !='City'){
              sql = 'SELECT * FROM Hikes WHERE Hikes.' + filterType + ' = ?'

            }else{
              sql = 'SELECT * FROM Hikes JOIN HikeLocations ON Hikes.HikeID = HikeLocations.HikeID WHERE HikeLocations.' + filterType + ' = ?'
            } 
                console.log(sql);

           db.all(sql,[filterMinValue],(err,rows)=>{
            if(err)reject(err);
            else{
              console.log("rows:"+rows);
              const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
              
              resolve(hikes);

            }
          });}
        }else{
          if(filterType == 'Length' || filterType == 'ExpectedTime' || filterType == 'Ascent'){
            let sql = 'SELECT * FROM Hikes WHERE ' + filterType + ' <= ? AND ' + filterType + ' >= ?' 
            //console.log(sql);
            db.all(sql,[MaxValue,filterMinValue],(err,rows)=>{
              if(err)reject(err);
              else{
              const hikes = rows.map((r) => ({ HikeID: r.HikeID,  Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description}));
              resolve(hikes);
              }
            });
          }else{
            reject('problem deciphering data')
          }
        }
      }else reject('No such field');
        
    }
  );
}


exports.populateHikes= async ()=>{
  const locations =require ("./HikeLocations");
  await locations.emptyLocations();
  await locations.addLocation(1,'Baviera','Monaco');
  await locations.addLocation(2,'Dpto La Paz','La paz');
  await locations.addLocation(0,'Piemonte','Torino');
  await this.deleteHikes();
  await this.addHike(0,'title1' ,12.5, 180,    500  ,'begginer'     ,0.00  ,1.2   ,null);
  await this.addHike(1,'title2',5   ,  60 ,    300.5,'Professional' ,0.1   ,1.454 ,null);
  await this.addHike(2,'title3',7.0 ,90 ,-190 ,'undertermined',232.56,0.5567,null);

}
