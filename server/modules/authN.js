'use strict';
const db = require('./DB').db;
const crypto = require('crypto');

exports.checkCredentials = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) { reject(err); }
        else if (row === undefined) { resolve(false); }
        else {
          const user = {Id: row.Id, email: row.email};
          const salt = row.salt;
          crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
            if (err) reject(err);

            const passwordHex = Buffer.from(row.hash, 'hex');

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
            const user = {Id: row.Id, email: row.email, role: row.role}
            resolve(user);
          }
      });
    });
  };