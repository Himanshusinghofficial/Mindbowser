const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({

  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    require
  },
  Company: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('user', ManagerSchema);
