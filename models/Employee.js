const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' //refer
  },
  EmpId :{
     type: Number,
     require: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
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
  Mobile: {
    type: Number,
    require: true
  },
  City: {
    type: String,
    require: true
  },
 
});

module.exports = mongoose.model('contact', EmployeeSchema);
