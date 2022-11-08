'use strict';

const express = require('express');
const {check, validationResult} = require('express-validator'); // validation middleware
const hikes=require('./modules/Hikes.js');
// init express
const app = new express();
const port = 3001;


//get hikes full list
app.get('/getHikes', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }
    hikes.getHikes()
      .then(list => res.json(list))
      .catch(() => res.status(500).end());
  });

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
