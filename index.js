const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');

const config = require('./config.json');

const db = require('./models')(Sequelize, config);

db.turtles.findAll().then(turtles => {
    console.log(turtles)
});
