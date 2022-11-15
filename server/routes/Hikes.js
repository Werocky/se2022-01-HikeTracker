'use strict';

const express = require('express');
const router = express.Router();
const Hikes_DAO = require('../modules/Hikes');

router.use(express.json());



///api

app.get('/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
    }
    else
      res.status(401).json({ error: 'Unauthenticated user!' });;
  });