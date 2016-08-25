const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', (req, res) => {
  // POST /api/users/register
  // Model method in model, custom model method
  // req.body ---> {username: 'bob', password: 'secure'}
  User.register(req.body, (err, newUser) => {
    // check if username is taken (username is unique)
    // create the user document

    res.status(err ? 400: 200).send(err);
  });
})

router.post('/login', (req, res) => {
  // req.body ---> {username: 'bob', password: 'secure'}
  // login attempt
  // 1. check if user exists and password is correct
  // 2. create a token (JWT)
  // 3. set the token in a cookie

  User.authenticate(req.body, (err, token) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.cookie('authtoken', token).send(); //since token is a cookie, saved with user
    } //authtoken is key in key value pair
  })
})

router.get('/profile', User.authMiddleware, (req, res) => { //route hits middleware before (req, res)
  res.send(req.user);
  //req.user IS THE USER DOCUMENT
})

// LOG OUT USER
router.post('/logout', (req, res) => {
  res.clearCookie('authtoken').send();
})

// Route to update user's birthday
// router.put('/profile', User.authMiddleware, (req, res) => {
//   User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true}, (err, user) => {
//     // the only reason why we have req.user is b/c authMiddleware
//   })
//   // req.user.birthday = req.body.birthday
//   // req.user.save(err => {
//   //   res.status(err ? 400: 200).send(err);
//   // })
// })

module.exports = router;
