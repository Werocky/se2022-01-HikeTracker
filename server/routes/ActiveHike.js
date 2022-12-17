'use strict'; 

const express = require('express');
const router = express.Router();
const ActivePoints= require('../modules/ActiveHike');
const hikes= require('../modules/Hikes');
const refPoint =require('../modules/HikeRefPoints');


const { check, validationResult, body } = require('express-validator'); // validation middleware
const { response } = require('express');
const cors = require('cors');


router.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
router.use(cors(corsOptions))


router.post('/PassPoint',[
    //check hikeID valid
    
    //check hikerID valid
    //check pointID valid
],async(req,res)=>{

    const errors= validationResult(req);  
    if(!errors.isEmpty()){
        return res.status(422).json({ error: 'cannot process request' });
    } 
    try{
        //check hike exists
        const Hike= await hikes.getHike(req.body.HikeID);
        
        if(Hike==undefined || Hike==null || Hike.HikeID!= req.body.HikeID){
            return res.status(402).json({'error': 'Hike could not be found'});
        }
        if(Hike==undefined || Hike==null || Hike.HikeID!= req.body.HikeID){
            return res.status(402).json({'error': 'Hike could not be found'});
        }
        
        //check point exists
        //check point belongs to hike

        const hikeRefPts= await refPoint.getHikeInfo(req.body.HikeID);
        let flag=false;
        hikeRefPts.forEach(point => {
            if(point.RefPointID== req.body.RefPointID)flag=true;
        });
        if(!flag)return res.status(403).json({'error':'ReferencePoint not registered to HIke: '+ req.body.HikeID});
        
        //set activePoint as reached in DB
        await ActivePoints.RegisterActivePoint(req.body.HikeID,req.body.HikerID,req.body.PointID);
        return res.status(200);
    }catch(error){
        res.status(503).json(error);
    }

});

module.exports = router;