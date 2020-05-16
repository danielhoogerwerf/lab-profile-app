const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'user not authenticatd' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'User logged' });
    });
  })(req, res, next);
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'User logged~' });
    return;
  }
  res.status(403).json({ message: 'please authenticate' });
});

router.post('/signup', (req, res, next) => {
  const { username, password, campus, course } = req.body;

  console.log(username);
  if (!username || !password) {
    res.status(401).json({ message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.status(409).json({ message: 'The username already exists' });
      //
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      campus,
      course,
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json({ message: 'User created' });
        //res.redirect("/");
      })
      .catch((err) => {
        res.status(404).json({ message: 'Something went wrong' });
        //res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.post('/upload', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(403).json({ message: 'please authenticate' });
    return;
  }

  const { file } = req.body;
  // upload file code here
});

router.post('/edit', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(403).json({ message: 'please authenticate' });
    return;
  }

  const { username, campus, course } = req.body;
  User.updateOne(
    { _id: req.user.id },
    { username: username, campus: campus, course: course }
  ).then((status) =>
    res
      .status(200)
      .json({ message: 'User updated' })
      .catch((e) => res.status(500).json({ message: `An error occured: ${e}` }))
  );
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'OK' });
});

module.exports = router;
