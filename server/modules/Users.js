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

exports.populateUsers =async()=>{
    await this.register("$2a$10$l6NqsLb7oo8V2slf47ZCBebX4GcgnvGRv3aK288phYdTAJpOO5DMS","$2a$10$l6NqsLb7oo8V2slf47ZCBe","c@polito.it","H");
    await this.register("$2a$10$zOKLnejjPVAlIU/yTG3AauiazkEuYbWy1aMpvqw81i5MfH8TqSGZe","$2a$10$zOKLnejjPVAlIU/yTG3Aau","d@polito.it","L");
    await this.register("$2a$10$NzNYFhDhoLWt3873hJC6hO8aLoXcMb0HpO2b6O2iG5hdVsa4xJpwu","$2a$10$NzNYFhDhoLWt3873hJC6hO","b@polito.it","H");
    return new Promise((resolve,rejects)=>{
        resolve('Tables filled');
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