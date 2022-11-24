'use strict';

const db = require('./DB').db;
class File{
  constructor(HikeID,FileName){
    this.HikeID=HikeID;
    this.FileName=FileName;
  }
}

exports.getFileName = (HikeID) => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM FileNames WHERE HikeID=?';
      db.get(sql, [HikeID], (err, row) => {
  
        if (err) {
          reject(err);
        }
        const FileName = row.FileName;
        resolve(FileName);
      });
    });
  };

  exports.getFiles = () => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM FileNames';
      db.all(sql, [], (err, rows) => {
        if (err) {
          //console.log('/rejected');
          reject(err);
        }
        //console.log(rows);
        let hikes=[];
        rows.forEach(r => {
          hikes.push(new File(r.HikeID,r.FileName));
        });
        //const hikes = rows.map((r) => ({ HikeID: r.HikeID, FileName: r.FileName}));
        resolve(hikes);
      });
    });
  };
  exports.addFile=(HikeID,Path)=>{
    return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO FileNames(HikeID, FileName) VALUES (?,?);";
      db.run(sql, [HikeID,Path], function (err) {
          if (err)
              reject(err);
          else {
              resolve('New file path added');
          }
      });
    });
  }

  exports.updateFile = (HikeID, Path) => {
    return new Promise(async (resolve, reject) =>{
      const sql = "UPDATE FileNames SET FileName = ? WHERE HikeID = ?";
      db.run(sql, [Path, HikeID], function (err) {
        if (err)
          reject(err);
        else
          resolve('File path updated');
      });
    });
  }

  exports.emptyConnection=()=>{
    return new Promise(async (resolve, reject) => {
      db.run("DELETE FROM FileNames", [], function (err) {
          if (err)
              reject(err);
          else
              resolve('Files emptied');
      });
  })
  }