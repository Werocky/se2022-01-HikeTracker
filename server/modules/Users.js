'use strict';

const db = require('./DB').db;

class User {
  constructor(Hash, Salt, Id, Role, code, verified){
    this.Hash=Hash;
    this.Salt=Salt;
    this.Id=Id;
    this.Role=Role;
    this.code=code;
    this.verified=verified;
  }
}

exports.getUsers =()=>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users';
        db.all(sql, [], (err, rows) => {
       
          if (err) {
            console.log('/rejected');
            reject(err);
          }else{
            
            const userList = rows.map(user => new User(user.Hash, user.Salt, user.Id, user.Role, user.code,user.verified));
            
            resolve(userList);
          }
          
        });
      });
}

exports.getUserById =(Id)=>{
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE Id=?';
      db.get(sql, [Id], (err, rows) => {
        if (err) {
          console.log('/rejected');
          reject(err);
        }
        if(rows === undefined) resolve('ok');
        else
        {const users= new User(rows.Hash,rows.Salt,rows.Id,rows.Role,rows.code,rows.verified);
        resolve(users);}
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

exports.register=(Hash, Salt, Id, Role, code)=>{
    return new Promise( async (resolve, reject) => {
        const sql = "INSERT INTO Users (Hash, Salt, Id, Role, code, verified) VALUES(?, ?, ?, ?, ?, ?)";
        db.run(sql, [Hash, Salt, Id, Role, code, 0], function(err){
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

exports.checkVerificationCode=(code, Id)=>{
    return new Promise(async (resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE Id = ?';
        db.get(sql, [Id], (err, rows) => {
          if (err) {
            reject(err);
          }
          if(rows.code == code && rows.code != 0)
            resolve(rows);
          reject("invalid code");
        });
    })
  }

  exports.setVerificationCode=(code, Id)=>{
    return new Promise(async (resolve, reject) => {
        const sql = 'UPDATE Users SET code = ? WHERE Id = ?';
        db.run(sql, [code, Id],function(err){
            if(err)
                reject(err);
            else
                resolve('verification code set');
        });
    })
  }

  exports.setVerified=(Id)=>{
    return new Promise(async (resolve, reject) => {
        const sql = 'UPDATE Users SET verified = ? WHERE Id = ?';
        db.run(sql, [1, Id],function(err){
            if(err)
                reject(err);
            else
                resolve('User verified correctly');
        });
    })
  }