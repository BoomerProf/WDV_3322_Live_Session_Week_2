const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/user');

router.post('/signup', (req, res, next) => {
  // get values from body
  // look up to see if the email is already registered
  // if we dont find the user. new user
  // encrypt the password
  // then we save to mongodb
  // esle
  // user was found send back response user exists or email exists
  const password = req.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        firstname: req.body.firstName,
        email: req.body.email,
        password: hash,
      });

      // save to db
      // send back ur response
      res.status(201).json({
        message: 'User created',
        user: user,
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  // find user by email
  // if no user then authentication failed
  // else
  // user is returned with hashed password
  // using bcrypt you can compare the passwords (err, boolean)
  // if err then authenication failed
  // else sucessful and return results
  bcrypt.compare(req.body.password, req.body.hash, (err, result) => {
    if (err) return res.status(501).json({ error: { message: err.message } });
    if (result) {
      res.status(200).json({
        message: 'Authenication Sucessful',
        result: result,
        name: req.body.firstName,
      });
    } else {
      res.status(401).json({ message: 'Authentcation Failed' });
    }
  });
});

router.get('/profile', (req, res) => {
  res.status(200).json({ message: 'Profile' });
});

module.exports = router;
