'use strict';

const db = require('./DB').db;
class File{
  constructor(HikeID,GpxFile){
    this.HikeID=HikeID;
    this.FileName=GpxFile;
  }
  
}


function getFileName  (HikeID)  {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT GpxFile FROM Hikes WHERE HikeID=?';
      db.get(sql, [HikeID], (err, row) => {
  
        if (err) {
          reject(err);
        }
        let GpxFile = row.GpxFile;
      
        resolve(GpxFile);
      });
    });
  };

  function getFiles  ()  {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Hikes';
      db.all(sql, [], (err, rows) => {
        if (err) {
         
          reject(err);
        }
        
        let hikes=[];
        rows.forEach(r => {
          hikes.push(new File(r.HikeID,r.GpxFile));
        });
      
        resolve(hikes);
      });
    });
  };
  
  function addFile(HikeID,Path){
    return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO Hikes(HikeID, GpxFile) VALUES (?,?);";
      db.run(sql, [HikeID,Path], function (err) {
          if (err)
              reject(err);
          else {
              resolve('New file path added');
          }
      });
    });
  }

  function updateFile  (HikeID, Path)  {
    return new Promise(async (resolve, reject) =>{
      const sql = "UPDATE Hikes SET GpxFile = ? WHERE HikeID = ?";
      db.run(sql, [Path, HikeID], function (err) {
        if (err)
          reject(err);
        else
          resolve('File path updated');
      });
    });
  }

  function emptyConnection(){
    return new Promise(async (resolve, reject) => {
      db.run("DELETE FROM Hikes", [], function (err) {
          if (err)
              reject(err);
          else
              resolve('Files emptied');
      });
  })
  }

  module.exports={
    emptyConnection,
    updateFile,
    addFile,
    getFiles,
    getFileName,
    File

  }