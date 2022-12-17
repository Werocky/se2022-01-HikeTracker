'use strict';

const db = require('./DB').db;


class  ActiveHikePoint{
    constructor(HikeID,HikerID,PointID,ArrivalTime){
        this.HikeID=HikeID;
        this.HikerID=HikerID;
        this.PointID=PointID;
        this.ArrivalTime=ArrivalTime;
    }
}
function RegisterActivePoint(HikeID,HikerID,PointID){
    let Time= new Date();
        try{
        let answer= ReserveActivePoint(HikeID,HikerID,PointID,Time.getTime());
        return answer;
    }catch(error){
        throw(error);
    }
}
function ReserveActivePoint(HikeID,HikerID,PointID,timestamp){
    return new Promise((resolve,reject)=>{
        const sql= "INSERT INTO ActiveHikePoints(HikeID,HikerID,PointID, ArrivalTime) VALUES (?,?,?,?)";

        db.run(sql,[HikeID,HikerID,PointID,timestamp],(error)=>{
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

module.exports ={
    ActiveHikePoint,
    RegisterActivePoint,
    ReserveActivePoint,
    emptyConnection,
    getActivePoints
}