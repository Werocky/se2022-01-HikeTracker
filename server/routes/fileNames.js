'use strict';

const fileNames= require('../modules/FileNames');

let gpxParser = require('gpxparser');
const express = require('express');
var fs = require('fs');
const { check, validationResult } = require('express-validator'); // validation middleware


const app = express.Router();

app.use(express.json());

/***************** FILE NAMES **********************/

app.post('/', (req, res) => {
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

  module.exports = app;