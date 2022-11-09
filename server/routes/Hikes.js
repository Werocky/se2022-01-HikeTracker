'use strict';

const express = require('express');
const router = express.Router();
const Hikes_DAO = require('../modules/Hikes');

router.use(express.json());



///api

//testing
router.get('/', async (req, res) => {
    try {
        let hikes = await Hikes_DAO.getHikes();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).end();
    }
});