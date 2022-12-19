'use strict';

const db = require('./DB').db;


class  ActiveHikePoint{
    constructor(HikeID,HikerID,PointID,ArrivalTime,activeHikeID){

        this.HikeID=HikeID;
        this.HikerID=HikerID;
        this.PointID=PointID;
        this.ArrivalTime=ArrivalTime;
        this.activeHikeID=activeHikeID;
    }
}
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

function getNextActiveHike(){
    return new Promise((resolve,reject)=>{
        db.get("SELECT MAX(ActiveHikeID) AS MHID FROM ActiveHikePoints",[],(err,row)=>{

            
            if(err)reject(err);
            
            if(row==undefined || row== null)resolve(1);
            resolve(row.MHID + 1);
        })
    })
}

module.exports ={
    ActiveHikePoint,
    RegisterActivePoint,
    ReserveActivePoint,
    emptyConnection,
    getActivePoints, 
    getNextActiveHike
}