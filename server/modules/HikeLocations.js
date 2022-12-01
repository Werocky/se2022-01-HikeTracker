'use strict';

const db = require('./DB').db;

exports.getHikeLocations = () => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes';
      db.all(sql, [], (err, rows) => {

        if (err) {
          reject(err);
        }
        const hikes = rows.map((r) => ({ HikeID: r.HikeID,Country : r.Country,Region:r.Region, City: r.City}));
        resolve(hikes);
      });
    });
};

exports.getHikeLocationsPerID = (HikeID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Hikes WHERE HikeID = ?';
    db.get(sql, [HikeID], (err, r) => {

      if (err) {
        reject(err);
      }
  
      resolve({HikeID: r.HikeID, Country : r.Country, City: r.City, Region: r.Region});
    });
  });
};

exports.addLocation= (hikeID,Country,Region,City)=>{/*
  Modifies the location Of a Hike
*/
 return new Promise(async (resolve, reject) => {
    if(Country==null && Region==null && City==null)reject('no new location');
    let flag=0;
    let args=[]
    let sql = "UPDATE Hikes SET "
    if(Country!=null){
      flag++;
      args.push(Country)
      sql= sql + "Country = '"+Country+"'"
    }if(  City!=null  ){
      if(flag>0){
        flag++;
        sql=sql+', '
      } 
      sql= sql + "City = '"+City+"'"
      args.push(City)
    }if(  Region!=null  ){
      if(flag>0){
        sql=sql+', '
      } 
      args.push(Region)
      sql= sql + "Region = '"+Region+"'";
    }
      
    
    sql= sql +  " WHERE HikeID = "+hikeID;
    
    args.push(hikeID)
    
    db.run(sql, [], function (err) {
        if (err)
            reject(err);
        else {
            resolve('New location added');
        }
    });
  });
};

exports.emptyLocations=()=>{
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM Hikes", [], function (err) {
        if (err)
            reject(err);
        else
            resolve('Hikes emptied');
    });
  })
}

exports.populateLocations= ()=>{ 
  return new Promise(async (resolve, reject) => {
  const sql = "INSERT INTO Hikes(HikeID, Region, City) VALUES ('1', 'Aosta', 'Cervinia');";
      db.run(sql, [], function (err) {
          if (err)
              reject(err);
          else {
              resolve('Tables filled');
          }
        })
  })
}// NOT NECESSARY
  
    