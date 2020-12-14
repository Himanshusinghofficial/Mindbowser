const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const Manager = require('../models/Manager');

// POST api/manager
// Regiter a manager
router.post(
  '/',
  [
    check('FirstName', 'Please add FirstName')
    .not()
    .isEmpty(),
    check('LastName', 'Please add Lastname')
    .not()
    .isEmpty(),
    check('Email', 'Please include a valid email').isEmail(),
    check(
      'Password',
      'Please enter a password with 6 or more characters',
    ).isLength({min: 6}),
    check('Address', 'Please add Address')
    .not()
    .isEmpty(),
    check('DOB', 'Please add DOB')
    .not()
    .isEmpty(),
    check('Company', 'Please add Company')
    .not()
    .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {FirstName, LastName, Email, Password, Address, DOB, Company} = req.body;

    try {
      let user = await Manager.findOne({Email});

      if (user) {
        return res.status(400).json({msg: 'User already exists'});
      }

      user = new Manager({
        FirstName, 
        LastName, 
        Email, 
        Password, 
        Address,
        DOB, 
        Company
      });

      const salt = await bcrypt.genSalt(10);
      user.Password = await bcrypt.hash(Password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
