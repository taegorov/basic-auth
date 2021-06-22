'use strict';

// 3rd Party Resources
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const userRouter = require('./auth/router');


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Use router
app.use(userRouter);



// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));




module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log('app up and running! port is:', PORT));
  }
}