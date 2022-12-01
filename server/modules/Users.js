'use strict';

const db = require('./DB').db;
exports.new =(Hash, 
  Salt, 
  Id, 
  Role, 
  code, 
  verified,
  Name,
  Surname,
  Phone)=>{
    return new User(Hash, Salt,Id,Role,code,verified,Name,Surname,Phone)
  }
class User {
  constructor(Hash, 
    Salt, 
    Id, 
    Role, 
    code, 
    verified,
    Name,
    Surname,
    Phone){
    this.Hash=Hash;
    this.Salt=Salt;
    this.Id=Id;
    this.Role=Role;
    this.code=code;
    this.verified=verified;
    this.Name=Name;
    this.Surname=Surname;
    this.Phone=Phone;
  }
}


exports.getUsers =()=>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users';
        db.all(sql, [], (err, rows) => {
       
          if (err) {
            
            reject(err);
          }else{
            
            const userList = rows.map(user => new User(user.Hash, user.Salt, user.Id, user.Role, user.code,user.verified,user.Name,user.Surname,user.Phone));
            
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
          
          reject(err);
        }
        if(rows === undefined) resolve('ok');
        else
        {const users= new User(rows.Hash,rows.Salt,rows.Id,rows.Role,rows.code,rows.verified,rows.Name,rows.Surname,rows.Phone);
        resolve(users);}
      });
    });
}

exports.populateUsers =async()=>{
   let  usr1= new User("$2a$10$l6NqsLb7oo8V2slf47ZCBebX4GcgnvGRv3aK288phYdTAJpOO5DMS","$2a$10$l6NqsLb7oo8V2slf47ZCBe","c@polito.it","H",1234,0,"Name1","Surname1",123456789)
    await this.register(usr1);
    usr1= new User("$2a$10$zOKLnejjPVAlIU/yTG3AauiazkEuYbWy1aMpvqw81i5MfH8TqSGZe","$2a$10$zOKLnejjPVAlIU/yTG3Aau","d@polito.it","L",1234,0,"Name2","Surname2",123456789)
    await this.register(usr1);
    usr1= new User("$2a$10$NzNYFhDhoLWt3873hJC6hO8aLoXcMb0HpO2b6O2iG5hdVsa4xJpwu","$2a$10$NzNYFhDhoLWt3873hJC6hO","b@polito.it","H",1234,0,"Name3","Surname3",123456789)
    await this.register(usr1);
    return new Promise((resolve,rejects)=>{
        resolve('Tables filled');
    });

}

exports.register=(user)=>{
  
    return new Promise( async (resolve, reject) => {
        const sql = "INSERT INTO Users (Hash, Salt, Id, Role, code, verified,Name,Surname,Phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(sql, [user.Hash, user.Salt, user.Id, user.Role, user.code, 0, user.Name, user.Surname, user.Phone], function(err){
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
    
          if(rows!=undefined && rows.code!=undefined && rows.code == code && rows.code != 0)
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