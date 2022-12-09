'use strict';
const express = require('express');

const hikes= require('../modules/Hikes');
const referencePoints = require('../modules/ReferencePoints');
const hikeRefPoints = require('../modules/HikeRefPoints');
const { addReferencePoint, updateReferencePoint } = require('../modules/ReferencePoints.js');


const { check, validationResult } = require('express-validator'); // validation middleware


const app = express.Router();

/*** Geographical filter ***/
function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}


app.use(express.json());

/*************** HIKE REFERENCE POINTS ********************/

// add a new Hike
app.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    try {
      const hike = req.body.hike;
      const points = req.body.points;
      const Id = req.body.guideId;
  
      const hikeId = await hikes.getLastHikeId() + 1;
  
      // add hike
      await hikes.addHike(hike);
      console.log("Hike added");
  
      // add start point
      const start = points.start;
      console.log(start);
      await addReferencePoint(start.position.lat, start.position.lon, start.Type);
      const startId = await referencePoints.getLastRefPointID();
      console.log("Start Point added");
  
      // add ending point
      const end = points.end;
      await addReferencePoint(end.position.lat, end.position.lon, end.Type);
      const endId = await referencePoints.getLastRefPointID();
      console.log("End Point added");
  
      // add other points
      let pIdVec = [];
      for (let p of points.otherPoints) {
        await addReferencePoint(p.position.lat, p.position.lng, p.type);
        const pId = await referencePoints.getLastRefPointID();
        pIdVec.push(pId);
        console.log("Point added");
  
      }
  
      // add reference point connected to hike
      //start
      await hikeRefPoints.addHikeRefPoints(hikeId, startId, 1, 0);
      await hikeRefPoints.addHikeRefPoints(hikeId, endId, 0, 1);
      for (let p in pIdVec) {
        await hikeRefPoints.addHikeRefPoints(hikeId, p, 0, 0);
      }
  
      res.status(201).json({ hikeId: hikeId });
    } catch (err) {
      console.log(err);
      res.status(503).json({ error: 'Internal error' });
    }
    console.log("All hike point added");
  
  
  })

  //UPDATE START/END POINTS

app.put('',
[check('Id').notEmpty(),
check('StartId').notEmpty(),
check('EndId').notEmpty(),
check('Start').notEmpty(),
check('End').notEmpty()], async (req, res) => {

  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'Cannot process request' });
  }

  const startId = req.params.StartId;
  const endId = req.params.EndId;
  const start = req.params.Start;
  const end = req.params.End;
  const id = req.params.Id;

  try {
    await hikes.editStartEndPoints(start, end, id);
    await hikeRefPoints.setIsEnd(id, 1, endId);
    await hikeRefPoints.setIsStart(id, 1, startId);
    res.status(201).end();
  } catch (err) {
    res.stauts(503).json({ error: 'Internal error' });
  }
})

app.get('/', async (req, res) => {
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'Cannot process request' });
  }
  try {
    const HutsAndParks = await hikeRefPoints.getHutsAndParks();
    console.log('HutsAndParks:' + HutsAndParks);
    res.status(200).json(HutsAndParks);
  } catch (err) {
    console.warn(err);
    res.status(503).json({ error: 'Internal error' });
  }
})

app.post('/', [check('HikeID').notEmpty], async (req, res) => {
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'Cannot process request' });
  }

  const id = req.params.HikeID;

  try {
    const hikeInfo = await hikeRefPoints.getHikeInfo(id);
    res.status(200).json(hikeInfo);
  } catch (err) {
    res.status(503).json({ error: 'Internal error' })
  }
})

// GET near hikes
app.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }
  const radius = req.body.radius;
  const lat1 = req.body.lat;
  const lng1 = req.body.lng;
  let hikesID = [];

  try {

    let startPoints = await referencePoints.getStartingPoints();
    startPoints.forEach((e) => {

      const lat2 = e.Lat;
      const lng2 = e.Lng;
      const dist = distance(lat1, lng1, lat2, lng2);

      if (dist <= radius) {
        hikesID.push(e.HikeID);
      }
    });

    let result = [];

    for (let i = 0; i < hikesID.length; i++) {
      let h = await hikes.getHike(hikesID[i]);
      result.push(h);
    }

    res.status(200).json(result);

  } catch (err) {
    res.status(503).json({ error: `Error` });
  }
});


module.exports = app;