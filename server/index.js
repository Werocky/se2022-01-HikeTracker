'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const cors = require('cors');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const hikes = require('./modules/Hikes.js');
const authN = require('./modules/authN.js');
const hikeRefPoints = require('./modules/HikeRefPoints');
const referencePoints = require('./modules/ReferencePoints');
const locations = require('./modules/HikeLocations.js')
const { db } = require('./modules/DB.js');
const users = require('./modules/Users');
const fileNames = require('./modules/FileNames.js');
let gpxParser = require('gpxparser');
var fs = require('fs');
const fileUpload = require("express-fileupload");
const { builtinModules } = require('module');
const { createParkingLot, updateParkingLot, getParkingLots, getParkingLot, deleteParkingLot, getLastParkingID } = require('./modules/ParkingLot.js');
const { addReferencePoint, updateReferencePoint } = require('./modules/ReferencePoints.js');



/*** Set up Passport ***/
//configurating function to verify login and password
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

// init express
const app = new express();
const port = 3001;

//init middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions))

// set up the session
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  fileUpload({
    safeFileNames: true,
    preserveExtension: true,
  })
);

//get hikes gpx
app.post('/getPointsHike', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }
  const HikeID = req.body.HikeID;
  var gpx = new gpxParser(); //Create gpxParser Object
  fileNames.getFileName(HikeID)
    .then(filename => {
      fs.readFile(filename, function (err, data) {
        if (err) throw err;
        gpx.parse(data); //parse gpx file from string data
        const points = gpx.tracks[0].points;
        res.status(200).json(points);
      });
    })
    .catch(() => res.status(500).end());
});


//get hikes full list
app.get('/getHikes', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }
  hikes.getHikes()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get hike, given HikeID
app.post('/getHikeByID', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }

  let HikeID = req.body.HikeID;

  try {
    let hike = await hikes.getHike(HikeID);
    res.status(200).json(hike);
  } catch (err) {
    res.status(503).json({ error: `Error` });
  }
});


//get the filtered hikes
app.post('/getFilteredHikes', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }

  let filters = req.body;
  let list = [];
  console.log(filters);
  if (checkFiltersPresence(filters) === false) {
    list = await hikes.getHikes();
  }
  else {
    await filtering(filters, list);
  }
  try {
    res.status(200).json(list);
  } catch (err) {
    res.status(503).json({ error: `Error` });
  }
});

//check wheter filter are specified and which
const checkFiltersPresent = (filter, name) => {
  if (name == 'ExpectedTime' || name == 'Ascent' || name == 'Length')
    return filter[0] !== null;
  else
    return typeof filter != 'undefined';
}

//check if filters are specified, otherwise getFilteredHikes returns same value as getHikes
const checkFiltersPresence = (filters) => {
  let flag = false;
  const name = Object.getOwnPropertyNames(filters);
  for (let i = 0; i < name.length; i++) {
    if (name[i] === 'ExpectedTime' || name[i] === 'Ascent' || name[i] === 'Length') {
      if (filters[name[i]][0] !== null)
        flag = true;
    }
    else if (name[i] === 'Province' || name[i] === 'City' || name[i] === 'Difficulty') {
      if (filters[name[i]] !== '' && typeof filters[name[i]] !== 'undefined')
        flag = true;
    }
  }
  return flag;
}

//function used to search if an HikeID is presents, given an array of Hikes
const searchHikeInArray = (HikeID, array) => {
  let flag = false;
  array.forEach(function (element) {
    if (element.HikeID == HikeID)
      flag = true;
  });
  return flag;
}
//filtering function
const filtering = async (filters, list_curr) => {
  let list_prev = [];
  let prov_list = [];
  let flag = false;
  let j = 0;
  const list_filters = Object.getOwnPropertyNames(filters);
  for (var i = 0; i < list_filters.length; i++) {
    flag = checkFiltersPresent(filters[list_filters[i]], list_filters[i]);
    //console.log(filters[list_filters[i]], list_filters[i], flag);  
    if (flag == true) {
      if (list_filters[i] !== 'Province' && list_filters[i] !== 'City' && list_filters[i] !== 'Difficulty')
        list_prev = await hikes.getHikesByFilter(list_filters[i], ...filters[list_filters[i]])
          .then(l => l);
      else
        list_prev = await hikes.getHikesByFilter(list_filters[i], filters[list_filters[i]])
          .then(l => l);
      if (j === 0) {
        prov_list = [...list_prev];
        j = 1;
      }
      if (i !== 0 && j === 1) {
        list_prev = list_prev.filter(value => (searchHikeInArray(value.HikeID, prov_list)));
      }
      prov_list = [...list_prev];
    }
  }
  list_prev.forEach(function (element) { list_curr.push(element) })
}

//add and modify description
app.put('/setDescription', /*isLoggedIn,*/[
  check('Description').notEmpty(),
  check('HikeID').notEmpty(),
],
  async (req, res) => {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    const Description = req.body.Description;
    const HikeID = req.body.HikeID;
    try {
      await hikes.setDescription(Description, HikeID);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: `Internal Error` });
    }
  });

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

app.post('/getNearHikes', async (req, res) => {
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

/*** PARKING LOT APIs ***/

//POST
//Create parking lot
app.post('/ParkingLots',
  [check('Description').notEmpty(),
  check('free').notEmpty(),
  check('lat'),
  check('lng')], async (req, res) => {
  
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }
    const description = req.body.Description;
    const id = getLastParkingID()+1;
    const free = req.body.free;
    const refPoint = referencePoints.getLastRefPointID()+1;
    const lat = req.body.lat;
    const lng = req.body.lng;
    try {
      await createParkingLot(id, description, free);
      await addReferencePoint(refPoint, lat, lng, 'parking')
      res.status(201).end();
    } catch (err) {
      res.status(503).json({error: 'Internal error'});
    }
});

//PUT
//Update parking lot
app.put('/ParkingLots',
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
    const description = req.body.Description;
    const id = req.body.ParkingId;
    const free = req.body.free;
    const refPoint = req.body.RefPointID;
    const lat = req.body.lat;
    const lng = req.body.lng;
    try {
      await updateParkingLot(id, description, free);
      await updateReferencePoint(refPoint, lat, lng, 'parking');
      res.status(201).end();
    } catch (err) {
      res.status(503).json({error: 'Internal error'});
    }
});

//GET
//Return all parking lots
app.get('/ParkingLots', async (req, res) => {
  
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'cannot process request' });
    }

    try {
      const parkingLots = await getParkingLots();
      res.status(201).json(parkingLots);
    } catch (err) {
      res.status(503).json({error: 'Internal error'});
    }
});

//Return parking lot identified by id
app.post('/ParkingLots',
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
      res.status(503).json({error: 'Internal error'});
    }
});

//DELETE
//delete parking lot
app.post('/ParkingLots',
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
      res.status(503).json({error: 'Internal error'});
    }
});

/*** Users APIs ***/

// POST /sessions 
// login
app.post('/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err)
        return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/sessions/current', (req, res) => {
  req.logout(() => { res.end(); });
});

// GET /sessions/current
// check if user is logged in or not
app.get('/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});

// POST /sessions/new
// creates a new user's account
app.post('/sessions/new', async (req, res) => {
  try {
    const Hash = req.body.Hash;
    const Salt = req.body.Salt;
    const Id = req.body.Id;
    const Role = req.body.Role;
    const result = await users.register(Hash, Salt, Id, Role);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// POST /saveFile
// store a new gpx file
app.post('/saveFile/:hikeID', async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const file = req.files.file;
    const path = __dirname + "/gpx/" + file.name;
    const hikeID = req.params.hikeID; // STORE IT IN THE FileNames db with path
    file.mv(path, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.send({ status: "success", path: path });
    });
  } catch (err) {
    res.status(503).json({ error: `Internal Error` });
  }
})

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;