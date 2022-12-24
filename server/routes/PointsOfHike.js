'use strict'; 

const express = require('express');
const router = express.Router();
const hikes= require('../modules/Hikes');
const PointsOfHike= require('../modules/HikeRefPoints');
const referencePoint= require('../modules/ReferencePoints');


const { check, validationResult, body } = require('express-validator'); // validation middleware
const { response } = require('express');
const cors = require('cors');


router.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
router.use(cors(corsOptions))


//add a specific -existing- reference point to a Hike
router.post('/addReferencePointToHike',[//TODO check params

],async(req,res)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: 'cannot process request' });
    }
    try{
        //check hike exists
        
        let check= await hikes.getHike(req.body.HikeID);

        if(check==null || check.HikeID==null)return res.status(401).json({ error: 'HikeID not found in DB' });
        //check hike belongs to the HikeID
        if(check.AssociatedGuide==null || check.AssociatedGuide!= req.body.GuideID)return res.status(522).json({ error: 'Hike not assigned to user' });
        //check referencePoint Exists
        check= await referencePoint.getReferencePoint(req.body.PointID);
        if(check==undefined || check==null)return res.status(401).json({ error: 'Point not found in DB' });

        //addReferencePoint to Hike.-> not as start or End
        await PointsOfHike.addHikeRefPoints(req.body.HikeID,req.body.PointID,0,0);
        res.status(200).end();

    }catch(error){
        if(error=="Linked yet")res.status(504).json(error);

        res.status(503).json(error);
    }
})

//not usre if its the best way to work.
router.post('/isEnd',[
    //TODO check hikeID and PointID
],async(req,res)=>{

    const errors= validationResult(req);  
    if(!errors.isEmpty()){
        return res.status(422).json({ error: 'cannot process request' });
    } 
    try{
        let answer=await PointsOfHike.IsLastPoint(req.body.HikeID,req.body.RefPointID);
        return res.status(200).json(answer);
    }catch(error){
        res.status(503).json(error);
    }

});

module.exports = router;