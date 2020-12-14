const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

// const Manager = require('../models/Manager');
const Employee = require('../models/Employee');

// GET api/employees
// Get all users employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({user: req.user.id}).sort({
      date: -1,
    });
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST api/employee
//Add new employee

router.post(
  '/',
  [
    auth,
    [
      check('EmpId', 'Please add EmpId')
      .not()
      .isEmpty(),
      check('FirstName', 'Please add FirstName')
      .not()
      .isEmpty(),
      check('LastName', 'Please add Lastname')
      .not()
      .isEmpty(),
      check('Address', 'Please add Address')
      .not()
      .isEmpty(),
      check('DOB', 'Please add DOB')
      .not()
      .isEmpty(),
      check('Mobile', 'Please add Mobile Number')
      .not()
      .isEmpty(),
      check('City', 'Please add City')
      .not()
      .isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {EmpId, FirstName, LastName, Address, DOB, Mobile, City} = req.body;

    try {
      const newEmployee = new Employee({
        EmpId, 
        FirstName, 
        LastName, 
        Address, 
        DOB, 
        Mobile, 
        City,
        user: req.user.id,
      });

      const employee = await newEmployee.save();

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// PUT api/employee/:id
// Update employee

router.put('/:id', auth, async (req, res) => {
  const {EmpId, FirstName, LastName, Address, DOB, Mobile, City} = req.body;

  // Build contact object
  const contactFields = {};
  if (EmpId) contactFields.EmpId=EmpId;
  if (FirstName) contactFields.FirstName=FirstName;
  if (LastName) contactFields.LastName=LastName;
  if (Address) contactFields.Address=Address;
  if (DOB) contactFields.DOB=DOB;
  if (Mobile) contactFields.Mobile=Mobile;
  if (City) contactFields.City=City;

  try {
    let contact = await Employee.findById(req.params.id);

    if (!contact) return res.status(404).json({msg: 'Employee not found'});

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    contact = await Employee.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true},
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE api/employee/:id
// Delete employee
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Employee.findById(req.params.id);

    if (!contact) return res.status(404).json({msg: 'Employee not found'});

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Employee.findByIdAndRemove(req.params.id);

    res.json({msg: 'Employee removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
