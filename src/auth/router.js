'use strict';

const express = require('express');
const router = express.Router();
const { Users } = require('./models/user-model.js');
const basicAuth = require('./middleware/basic.js');


// Signup Route -- create a new user

router.post('/signup', createSignup);

async function createSignup(req, res, next) {
  try {
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  }
  catch (e) {
    console.log(e);
    res.status(403).send('Error: could not create user');
  }

}


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, createSignin);

async function createSignin(req, res, next) {
  console.log(req.user);
  res.send('Signed in!');
}


module.exports = router;