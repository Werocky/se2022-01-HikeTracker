'use strict'; 

const express = require('express');
const router = express.Router();
const Hikes = require('../modules/Hikes');
const Huts =require('../modules/Huts')

const { check, validationResult, body } = require('express-validator'); // validation middleware
const { response } = require('express');
const cors = require('cors');
router.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
router.use(cors(corsOptions))
  

router.post('/:RefPointID/Hike/:HikeID',[
    check('HikeID').isInt({gt:0}),
    check('RefPointID').isInt({gt:0})
],
async(req,res)=>{
    console.log(req.params);
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty())
        return response.status(422).json({error : 'Error! Bad request'});
        
       //check hike exists
       let h=await Hikes.getHikesByFilter('HikeID',req.params.HikeID);
       
       if(h.Length==[])return res.status(402).send('Hike Not Found');
        //check hut exists
        h=await Huts.getHut(req.params.RefPointID);
        if(h==[])return res.status(401).send('Hut Not Found');
        //add hutToHike
       h= await Hikes.addHutToHike(req.params.HikeID,req.params.RefPointID);
       if(h!='New HikeRefPoint added')return res.status(504).send('Error Adding Hut to Hike');
        
       res.status(200).end('added');
    
    }catch(err){
        console.error(err);
        res.status(503).send(err);
    }

});

module.exports = router;