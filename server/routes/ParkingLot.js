'use strict';
const express = require('express');

const PL= require('../modules/ParkingLot');
const referencePoints = require('../modules/ReferencePoints');
const { createParkingLot, updateParkingLot, getParkingLots, getParkingLot, deleteParkingLot, getLastParkingID } = require('../modules/ParkingLot.js');
const { addReferencePoint, updateReferencePoint } = require('../modules/ReferencePoints.js');


const { check, validationResult } = require('express-validator'); // validation middleware

const app = express.Router();


/*** PARKING LOT APIs ***/

//POST
//Create parking lot
app.post('/',[],
  [check('ParkingLot').notEmpty()], async (req, res) => {
  
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    const ParkingLot = {...req.body.ParkingLot, AssociatedGuide: req.user.Id};
    const Description = ParkingLot.Description;
    const lat = ParkingLot.Coord.lat;
    const lng = ParkingLot.Coord.lng;
    try {
      await createParkingLot(ParkingLot);
      await referencePoints.addReferencePointWithDescription(Description, lat, lng, 'parking')
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: 'Internal error' });
    }
  });

//PUT
//Update parking lot
app.put('/',
  [check('Description').notEmpty(),
  check('ParkingId').notEmpty(),
  check('free').notEmpty(),
  check('RefPointID'),
  check('lat'),
  check('lng')], async (req, res) => {

    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    
    try {
      const description = req.body.Description;
      const id = req.body.ParkingId;
      const free = req.body.free;
      const refPoint = req.body.RefPointID;
      const lat = req.body.lat;
      const lng = req.body.lng;
      await updateParkingLot(id, description, free);
      await updateReferencePoint(refPoint, lat, lng, 'parking');
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: 'Internal error' });
    }
  });

//GET
//Return all parking lots
app.get('/', async (req, res) => {

  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }

  try {
    const parkingLots = await getParkingLots();
    res.status(201).json(parkingLots);
  } catch (err) {
    res.status(503).json({ error: 'Internal error' });
  }
});

//Return parking lot identified by id
app.post('/',
  [check('ParkingId').notEmpty()], async (req, res) => {

    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }

    const id = req.body.ParkingId;
    try {
      const parkingLot = await getParkingLot(id);
      res.status(201).json(parkingLot);
    } catch (err) {
      res.status(503).json({ error: 'Internal error' });
    }
  });


//DELETE
//delete parking lot
app.post('/',
  [check('ParkingId').notEmpty()], async (req, res) => {

    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    const id = req.body.ParkingId;
    try {
      await deleteParkingLot(id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: 'Internal error' });
    }
  });

  module.exports = app;