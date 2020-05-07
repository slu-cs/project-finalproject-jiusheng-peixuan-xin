// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Statistic = new mongoose.Schema({
  county: {type:String, required: true, maxlength: 50, trim: false},
  confirmed: {type:Number, required: true,maxlength: 12},
  death: {type:Number, required: true,maxlength: 12},
  date: {type:Date(year, month, day),required: true}
});


module.exports = mongoose.model('Statistic', Statistic);
