'use strict';

const { getMyHikes } = require('./Hikes');

const db = require('./DB').db;

function RegisterActivePoint(HikeID,HikerID,PointID,activeHikeID){
    let Time= new Date();
        try{
        let answer= ReserveActivePoint(HikeID,HikerID,PointID,Time.getTime(),activeHikeID);
        return answer;
    }catch(error){
        throw(error);
    }
}
function ReserveActivePoint(HikeID,HikerID,PointID,timestamp,ActiveHikeID){
    return new Promise((resolve,reject)=>{
        const sql= "INSERT INTO ActiveHikePoints(HikeID,HikerID,PointID, ArrivalTime,ActiveHikeID) VALUES (?,?,?,?,?)";

        db.run(sql,[HikeID,HikerID,PointID,timestamp,ActiveHikeID],(error)=>{
            if(error)reject(error);
            resolve('ActivePoint Saved');
        })
    });
}


function getActivePoints(){
    return new Promise((resolve,reject)=>{
                db.all('SELECT * FROM ActiveHikePoints',[],(err,rows)=>{
                    if(err)reject(err);
                    
                    if(rows!=undefined)
                    resolve(rows);
                }); 
            
        }
    );
}

function getPointReachedInfo(HikeID, PointID, HikerID){
    return new Promise((resolve,reject)=>{
                db.all('SELECT ArrivalTime, PointID FROM ActiveHikePoints WHERE HikeID = ? AND PointID = ? AND HikerID = ?',[HikeID, PointID, HikerID],(err,rows)=>{
                    if(err)reject('Cannot find info on the point');
                    
                    if(rows!=undefined)
                    resolve(rows);
                }); 
            
        }
    );
}

function emptyConnection(){
    return new Promise(
        (resolve,reject)=>{
            db.serialize(function(){
                db.run('DELETE FROM ActiveHikePoints',[],(err)=>{
                    if(err)reject(err);
                }); 
            });
            resolve('emptied ActivePoints DB');
            
        }
    );
}

function getCurrentActiveHike(HikerID, HikeID){
    return new Promise((resolve,reject)=>{
        db.get("SELECT MAX(ActiveHikeID) AS MHID FROM ActiveHikePoints WHERE HikeID=? AND HikerID=?",[HikeID, HikerID],(err,row)=>{

            
            if(err)reject(err);
            
            if(row==undefined || row== null)resolve(1);
            resolve(row.MHID);
        })
    })
}

function getNextActiveHike(){
    return new Promise((resolve,reject)=>{
        db.get("SELECT MAX(ActiveHikeID) AS MHID FROM ActiveHikePoints",[],(err,row)=>{

            
            if(err)reject(err);
            
            if(row==undefined || row== null)resolve(1);
            resolve(row.MHID + 1);
        })
    })
}
function getUserHikeDetails(User, AHikeID){
    return new Promise((resolve,reject)=>{
        let sql="SELECT RP.RefPointID AS PointID, RP.description AS description, RP.Lat AS Lat, RP.Lng AS Lng, RP.Type AS Type, AH.ArrivalTime AS ArrivalTime FROM ActiveHikePoints AH, ReferencePoints RP WHERE RP.RefPointID = AH.PointID AND HikerID = ? AND ActiveHikeID = ?";
        db.all(sql,[User, AHikeID],(err,rows)=>{
            if(err)reject(err);

            resolve(rows);
        });
    })
}

function getHikerPointsOfHike(HikerID, HikeID){
    console.log("ciao  "+HikerID+" ah "+HikeID );
    return new Promise((resolve,reject)=>{
                db.all('SELECT * FROM ActiveHikePoints WHERE HikerID = ? AND HikeID = ?',[HikerID, HikeID],(err,rows)=>{
                    if(err)reject(err);
                    
                    if(rows!=undefined)
                    resolve(rows);
                }); 
            
        }
    );
}

module.exports ={
    RegisterActivePoint,
    ReserveActivePoint,
    emptyConnection,
    getActivePoints, 
    getNextActiveHike,
    getUserHikeDetails,
    getPointReachedInfo,
    getHikerPointsOfHike,
    getCurrentActiveHike
}