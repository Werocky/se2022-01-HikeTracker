'use strict';

const db = require('./DB').db;

exports.addHut = (RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description) => {
  return new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO HUTS(RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql, [
      RefPointID, Name, Elevation, City, Province, Region, Country, WhenOpen, Beds, AvgPrice, Description
    ], function (err) {
      if (err)
        reject(err);
      else
        resolve('Hut added');
    });
  });
};

exports.emptyHuts = () => {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM Huts;", [], function (err) {
      if (err)
        reject(err);
      else
        resolve('Huts emptied');
    });
  })
};

exports.getHuts = () =>{
  return new Promise(async (resolve, reject) =>{
    const sql = "GET * FROM Huts";
    db.all(sql, [], function (err, rows){
      if(err)
        reject(err);
      else{
        const huts = rows.map((r) => ({ RefPointID: r.RefPointID, Name: r.Name, Eleveation: r.Elevation, City: r.City, Province: r.Province, Region: r.Region, Country: r.Country, WhenOpen: r.WhenOpen, Beds: r.Beds, AvgPrice: r.AvgPrice, Description: r.Description }));
        resolve(huts);
      }
    })
  })
}

exports.getHut = (id = null, name = null, locationType = null, location = null, WhenOpen = null) =>{
  return new Promise(async (resolve, reject) =>{
    let sql = "GET * FROM Huts WHERE ";
    let parameters = [];

    if(name !== null){
      sql += "Name = ?";
      parameters.push(name);
    }
    if(locationType !== null){
      if(parameters.length === 0)
        sql += locationType + " = ?";
      else
        sql += " AND "+ locationType + " = ?";
      parameters.push(location);
    }
    if(WhenOpen !== null){
      if(parameters.length === 0)
        sql += "WhenOpen = ?";
      else
        sql += " AND WhenOpen = ?";
      parameters.push(WhenOpen);  
    }

    db.run(sql, parameters, function (err, rows) {
      if(err)
        reject(err);
      else{
        const huts = rows.map((r) => ({ RefPointID: r.RefPointID, Name: r.Name, Eleveation: r.Elevation, City: r.City, Province: r.Province, Region: r.Region, Country: r.Country, WhenOpen: r.WhenOpen, Beds: r.Beds, AvgPrice: r.AvgPrice, Description: r.Description }));
        resolve(huts);
      }
    })
  })
}

exports.deleteHut = (id) =>{
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Huts WHERE RefPointID = ?";
    db.run(sql, [id], function (err) {
      if(err)
        reject(err);
      else
        resolve("Entry deleted");
    })
  })
}