// this jwt secret MUST NOT BE COMMITTED
// it should be kept as an env variable
const JWT_SECRET = 'iluhgiUHFAI:Hfsh:SDoigh;oIHG';

const bcrypt = require('bcrypt-node');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

// use statics to create model method
userSchema.statics.register = function(userObj, cb) {
  //check to see if username is already in db
  this.findOne({username: userObj.username}, (err, dbUser) => {
    if (err) return cb(err);
    if (dbUser) return cb({error: 'Username already taken.'});

    bcrypt.genSalt(11, (err, salt) => {
      if (err) return cb(err);
      bcrypt.hash(userObj.password, salt, null, (err, hash) => {
        if (err) return cb(err);

        userObj.password = hash;

        // this refers to the model
        this.create(userObj, (err, newUser) => {
          cb(err);
        });
      });
    });

  });
};

userSchema.statics.authenticate = function(userObj, cb) {
  // userObj ---> login attempt

  // 1. check if user exists and password is correct
  // 2. create a token (JWT)
  // 3. callback with token
  let { username, password } = userObj;
  this.findOne({ username }, (err, user) => {
    if (err || !user) {
      return cb(err || {error: 'Login failed. Username or password incorrect.'});
    }

    // check if password is correct
    // if (user.password !== password) {
    //   return cb({error: 'Login failed. Username or password incorrect.'});
    // }
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return cb(err);
      if (!res) return cb({error: 'Login failed. Username or password incorrect.'});
          // make the token
          // don't put any sensitive info in payload
      let payload = {
        _id: user._id
      }

      jwt.sign(payload, JWT_SECRET, {}, cb); //cb is invoked here
    })
  });
};

userSchema.statics.authMiddleware = function(req, res, next) {
  // 1. read token from cookie
  // 2. verify token, decode payload (which contains the id)
  // 3. find the user by id

  // if token is good, we call next()
  // if token is bad or missing, we call res.status(401).send()
  // we end the request
  let token = req.cookies.authtoken; //reading token from cookie
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send(err); //used for user no good

    mongoose.model('User')
      .findById(payload._id)
      //.select({password: false}) same
      .select('-password') //removes password from user returned
      .exec((err, user) => {
        if (err) return res.status(400).send(err);
        if (!user) return res.status(401).send({error: 'User not found'}); // in case someone deletes user but still has token

        req.user = user; //set req.user to send to next equal to user returned by findById
        next();
      });
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
