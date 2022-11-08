'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const cors = require('cors');
const hikes=require('./modules/Hikes.js');

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

//get the filtered hikes
app.get('/getFilteredHikes', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }

    let filters = req.body;

    try {
        let list = await hikes.getHikes();
        let returned = filtering(filters, list);
        res.status(200).json(returned);
      } catch(err) {
        res.status(503).json({error: `Error`});
      }
  });

  //filtering function
let filtering = (filters, list) => {
    let vec = [];
    let flag = true;
    list.forEach(l => {
            if(typeof filters.Difficulty !== 'undefined')
            {
                if(l.Difficulty !== filters.Difficulty){return;}
                
            }
            if(typeof filters.MapId !== 'undefined')
            {
                if(l.MapId !== filters.MapId){return;}
            }
            if(typeof filters.Ascent !== 'undefined')
            {
                if(l.Ascent !== filters.Ascent){return;}
            }
            if(typeof filters.ExpectedTime !== 'undefined')
            {
                if(l.ExpectedTime !== filters.ExpectedTime){return;}
            }
            if(typeof filters.Length !== 'undefined')
            {
                if(l.Length !== filters.Length){return;}
            }
            vec.push(l);
        });
    return vec;
}

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
