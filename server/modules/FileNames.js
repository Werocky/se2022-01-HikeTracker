'use strict';

const db = require('./DB').db;

exports.getFileName = (HikeID) => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM FileNamesHikes WHERE HikeID=?';
      db.get(sql, [HikeID], (err, row) => {
  
        if (err) {
          reject(err);
        }
        const FileName = row.FileName;
        resolve(FileName);
      });
    });
  };