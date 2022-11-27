'use strict';
const db = require('./DB').db;
const crypto = require('crypto');
var bcrypt = require('bcrypt');
let transporter = require('./mail');

exports.checkCredentials = (Id, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE Id = ?';
      db.get(sql, [Id], (err, row) => {
        if (err) { reject(err); }
        else if (row === undefined) { resolve(false); }
        else {
          const user = {Id: row.Id, Role: row.Role};
          const Hash = row.Hash;
          bcrypt.compare(password, Hash, function(err, result) {
            if(err) resolve(err);
            if(result == true) resolve(user);  
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
            const user = {Id: row.Id, role: row.Role}
            resolve(user);
          }
      });
    });
  };