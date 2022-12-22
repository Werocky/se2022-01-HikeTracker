'use strict'; 

const express = require('express');
const router = express.Router();
const hikes= require('../modules/Hikes');
const refPoint =require('../modules/HikeRefPoints');
const PointsOfHike= require('../modules/HikeRefPoints');


const { check, validationResult, body } = require('express-validator'); // validation middleware
const { response } = require('express');
const cors = require('cors');


router.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
router.use(cors(corsOptions))


router.post('/isEnd',[
    //todo check hikeID and PointID
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