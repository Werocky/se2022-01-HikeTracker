'use strict';

const db = require('./DB').db;

exports.getUsers =()=>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users';
        db.all(sql, [], (err, rows) => {
  
          if (err) {
            console.log('/rejected');
            reject(err);
          }
          resolve(rows);
        });
      });
}

exports.populateUsers =()=>{
    return new Promise(async (resolve, reject) => {
        const sql = "INSERT INTO Users(Id, Hash, salt, role) VALUES "+
        "('b@polito.it','1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe',1234, 'h');";
        db.run(sql, [], function (err) {
            if (err)
                reject(err);
            else {
                resolve('Tables filled');
            }
        });
    });
}

exports.register=(Hash, Salt, Id, Role)=>{
    return new Promise( async (resolve, reject) => {
        const sql = "INSERT INTO Users (Hash, Salt, Id, Role) VALUES(?, ?, ?, ?)";
        db.run(sql, [Hash, Salt, Id, Role], function(err){
            if(err)
                reject(err);
            else
                resolve('User created correctly');
        });
    });
}

exports.emptyUsers=()=>{
    return new Promise(async (resolve, reject) => {
      db.run("DELETE FROM Users", [], function (err) {
          if (err)
              reject(err);
          else
              resolve('Users emptied');
      });
    })
  }