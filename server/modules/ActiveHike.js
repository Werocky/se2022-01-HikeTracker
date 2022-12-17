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
    let timeStamp= Time.getTime()
    try{
        ReserveActivePoint(HikeID,HikerID,PointID,timeStamp);
    }catch(error){
        throw(error);
    }
}
function ReserveActivePoint(HikeID,HikerID,PointID,timestamp){
    return new Promise((resolve,reject)=>{
        const sql= "INSERT INTO ActiveHikePoint (HikeID,HikerID,PointID,ArrivalTime) VALUES (?,?,?,?)";

        db.run(sql,[HikeID,HikerID,PointID,timestamp],(error)=>{
            if(error)reject(error);
            resolve('ActivePoint Saved');
        })
    });
}


module.exports ={
    ActiveHikePoint,
    RegisterActivePoint,
    ReserveActivePoint
}