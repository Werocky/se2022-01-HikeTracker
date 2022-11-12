'use strict';
const db = require('./DB').db;
const crypto = require('crypto');

exports.checkCredentials = (Id, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE Id = ?';
      db.get(sql, [Id], (err, row) => {
        if (err) { reject(err); }
        else if (row === undefined) { resolve(false); }
        else {
          const user = {Id: row.Id, role: row.role};
          const salt = row.salt;
          crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
            if (err) reject(err);
          
            const passwordHex = Buffer.from(row.Hash, 'hex');
            
            if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
              resolve(false);
            else resolve(user); 
          });
        }
      });
    });
  };

exports.getUserbyId = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE Id = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            const user = {Id: row.Id, role: row.role}
            resolve(user);
          }
      });
    });
  };