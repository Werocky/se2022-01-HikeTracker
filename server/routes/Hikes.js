'use strict';

const hikes= require('../modules/Hikes');
const express = require('express');

const app = express.Router();

const { check, validationResult } = require('express-validator'); // validation middleware

app.use(express.json());

// checking if the request is coming from an authenticated user or not, so to allow authorized users to perform actions
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

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


/***************** HIKES **********************/

//get hikes full list
app.get('/', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'cannot process request' });
  }
  hikes.getHikes()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get hike, given HikeID
app.post('/', async (req, res) => {
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
app.post('/', async (req, res) => {
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

//add and modify hike description
app.put('/', /*isLoggedIn,*/[
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

  module.exports = app;