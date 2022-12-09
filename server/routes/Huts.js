'use strict';

const huts= require('../modules/Huts');
const express = require('express');

const referencePoints = require('../modules/ReferencePoints');
const { addReferencePoint, updateReferencePoint } = require('../modules/ReferencePoints.js');

const { check, validationResult } = require('express-validator'); // validation middleware

const app = express.Router();

// checking if the request is coming from an authenticated user or not, so to allow authorized users to perform actions
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
  
    return res.status(401).json({ error: 'not authenticated' });
  }

/*** Huts ***/
// GET filtered
app.post('/hutsFilters', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    console.log(req.body);
    const name = req.body.name;
    const loc = req.body.location;
    const WhenOpen = req.body.WhenOpen
    const beds = req.body.beds
    const avgPrice = req.body.avgPrice;
    try {
      const result = await huts.getHutsFilters(name, loc ? loc.locationType : null, loc ? loc.location : null, WhenOpen, beds, avgPrice);
      res.status(200).json(result);
  
    } catch (err) {
      console.log(err);
      res.status(503).json({ error: `Error` });
    }
});

//GET locations
app.get('/', async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
}
try {
    const city = await huts.getHutCity();
    const province = await huts.getHutProvince();
    const region = await huts.getHutRegion();
    const country = await huts.getHutCountry();
    let location = {
    City: city.filter((el) => el != false),
    Province: province.filter((el) => el != false),
    Region: region.filter((el) => el != false),
    Country: country.filter((el) => el != false)
    };

    res.status(200).json(location);
} catch (err) {
    res.status(503).json({ error: `Error` });
}
})

//GET hut information

app.post('/getHut', async (req, res) =>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
}

try {
    console.log(req.body.Hut)
    const hutInfo = await huts.getHut(req.body.Hut);
    res.status(200).json(hutInfo);
} catch (err) {
    res.status(503).json( {error: 'Error' });
}
})

app.post('/getHutCoords', async (req, res) =>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
}

try {
    const hutCoords = await huts.getHutCoordinates(req.body.Hut);
    res.status(200).json(hutCoords);
} catch (err) {
    res.status(503).json( {error: 'Error' });
}
})

//add and modify hut description
app.put('/', isLoggedIn, [
check('Description').notEmpty(),
check('RefPointID').notEmpty(),
],
async (req, res) => {
    if (req.user.Role !== 'L') return res.status(401).json({ error: 'Unauthorized' });
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
    }
    const Description = req.body.Description;
    const RefPointID = req.body.RefPointID;
    try {
    await huts.setHutDescription(Description, RefPointID);
    res.status(201).end();
    } catch (err) {
    res.status(503).json({ error: `Internal Error` });
    }
});


app.post('/hutCreate' , 
check("Hut").notEmpty(),
    async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
    }
    console.log(req.body);
    const Hut = {...req.body.Hut, HutManagerID: req.body.Hut.Email};
    try {
    const result = await huts.addHut(Hut);
    await referencePoints.addReferencePointWithDescription(Hut.Description, Hut.Coord.lat, Hut.Coord.lng, "hut");
    res.status(200).json(result);

    } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Error ` });
    }
});


module.exports = app;
