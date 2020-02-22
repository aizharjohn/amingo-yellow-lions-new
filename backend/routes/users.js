const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//POST
//Register User

router.post(
  '/',
  [
    check('firstname', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastname', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('username', 'Please enter your desired username')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { firstname, lastname, email, username, password } = req.body;

    try {
      //See if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }]
        });
      }

      // Create avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        firstname,
        lastname,
        email,
        username,
        avatar,
        password
      });

      //BCRYPT
      const hashPassword = async () => {
        await bcrypt.genSalt((err, salt) => {
          bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            user.password = hashedPassword;
            user.save();
          });
        });
        //res.send('User registered');
        //res.send('User registered');
      };

      await hashPassword();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
