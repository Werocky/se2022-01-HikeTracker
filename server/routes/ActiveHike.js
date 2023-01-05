'use strict'; 

const express = require('express');
const router = express.Router();
const ActivePoints= require('../modules/ActiveHike');
const hikes= require('../modules/Hikes');
const session = require('express-session'); // enable sessions
const refPoint =require('../modules/HikeRefPoints');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const PointsOfHike= require('../modules/HikeRefPoints');
const authN = require('../modules/authN.js');


const { check, validationResult } = require('express-validator'); // validation middleware
const { response } = require('express');
const cors = require('cors');


router.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
router.use(cors(corsOptions))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (username, password, done) {
      authN.checkCredentials(username, password).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username and/or password.' });
  
        return done(null, user);
      })
    }
  ));
  
  // getting session from user 
  passport.serializeUser((user, done) => {
    done(null, user.Id);
  });
  
  // getting user from session
  passport.deserializeUser((id, done) => {
    authN.getUserbyId(id)
      .then(user => {
        done(null, user);
      }).catch(err => {
        done(err, null);
      });
  });

  
  // checking if the request is coming from an authenticated user or not, so to allow authorized users to perform actions
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
  
    return res.status(401).json({ error: 'not authenticated' });
  }
  
  /*** Ending setting up passport***/
  
  
// set up the session
router.use(session({
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
  }));
  
  //initializing passport
  router.use(passport.initialize());
  router.use(passport.session());
  

router.post('/GenerateActiveHike',[
  check('HikeID').notEmpty(),
  
],async(req,res)=>{
    const errors= validationResult(req);
  
    console.log(req.user);
   
    if(!errors.isEmpty()){
        return res.status(422).json({ error: 'cannot process request' });
    } 
    try{
        console.log("userId: "+req.user.Id);
        console.log("request: "+req.body.HikeID);
        console.log("request: "+req.body.PointID);
        const userID=req.user.Id;
        const HikeID=JSON.parse(req.body.HikeID);
        const PointID=req.body.PointID;
        console.log(PointID);
        
        console.log(HikeID);
        let NextActiveHikeID= await ActivePoints.getNextActiveHike();
        console.log("NxtActiveHikeID: "+NextActiveHikeID);

        const Hike= await hikes.getHike(HikeID);

        console.log("this is the hike "+Hike.HikeID);
        
        if(Hike==undefined || Hike==null || Hike.HikeID!= HikeID){
            return res.status(402).json({'error': 'Hike could not be found'});
        }
        //check point exists
        //check point belongs to hike

        console.log("Getting HikeInfo");
        const hikeRefPts= await refPoint.getHikeInfo(HikeID);
        console.log("HikeRefPoints: " + hikeRefPts);

        console.log("PointID:"+PointID);
        let flag=false;
        console.log("PointID.ID:"+PointID.RefPointID);
        hikeRefPts.forEach(point => {
          console.log("search pointID:"+point.RefPointID);
            if(point.RefPointID == PointID.RefPointID){
                flag=true;
            }  
        });

        if(!flag)return res.status(403).json({'error':'ReferencePoint not registered to Hike: '+ HikeID});
        
        //set activePoint as reached in DB
        await ActivePoints.RegisterActivePoint(HikeID,userID,PointID.RefPointID, NextActiveHikeID);

        
        return res.status(200).json({"ActiveHikeID":NextActiveHikeID});

    }catch(error){
      console.log(error);
        res.status(503).json(error);
    }
})

router.post('/PassPoint',[
    //todo check hikeID valid
    
    //todo check hikerID valid

    //todo check pointID valid

    //todo check activeHikeID valid

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
        
        //check point exists
        //check point belongs to hike

        const hikeRefPts= await refPoint.getHikeInfo(req.body.HikeID);
        let flag=false;
        
        hikeRefPts.forEach(point => {
            if(point.RefPointID== req.body.PointID){
                flag=true;
            }  
        });
        if(!flag)return res.status(403).json({'error':'ReferencePoint not registered to Hike: '+ req.body.HikeID});
        
        //set activePoint as reached in DB
        let answer=await ActivePoints.RegisterActivePoint(req.body.HikeID,req.user.id,req.body.PointID, req.body.ActiveHikeID);
        return res.status(200).json(answer);
    }catch(error){
        res.status(503).json(error);
    }

});

router.post('/getPointReachedInfo',[
  check('HikeID').notEmpty(),
  check('HikerID').notEmpty(),
  check('PointID').notEmpty()
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
      
      //check point belongs to hike

      const hikeRefPts= await refPoint.getHikeInfo(req.body.HikeID);
      let flag=false;
      
      hikeRefPts.forEach(point => {
          if(point.RefPointID== req.body.PointID){
              flag=true;
          }  
      });
      if(!flag)return res.status(403).json({'error':'ReferencePoint not registered to Hike: '+ req.body.HikeID});
      
      //set activePoint as reached in DB
      let answer=await ActivePoints.getPointReachedInfo(req.body.HikeID,req.body.PointID,req.body.HikerID);
      return res.status(200).json(answer);
  }catch(error){
      res.status(503).json(error);
  }

});

router.post('/getHikerPointsOfHike',[
  check('HikeID').notEmpty(),
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
      
      //set activePoint as reached in DB
      console.log(req.user);
      let answer=await ActivePoints.getHikerPointsOfHike(req.user.Id,req.body.HikeID );
      return res.status(200).json(answer);
  }catch(error){
      res.status(503).json(error);
  }

});


router.get('/myHikeReferencePoints',[
    //TODO check params
],async(req,res)=>{
    const errors= validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({ error: 'cannot process request' });
    } try{
        //TODO implement get /myHikes


        let answer=await ActivePoints.getUserHikeDetails(req.user.Id, req.body.ActiveHikeID);

        res.status(200).json(answer);


    }catch(error){
        res.status(503).json(error);
    }
});



module.exports = router;