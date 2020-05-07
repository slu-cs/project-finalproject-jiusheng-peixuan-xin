// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Statistic = new mongoose.Schema({
  county: {type:String, maxlength: 50},
  confirmed: {type:Number, maxlength: 12, trim: true},
  death: {type:Number, maxlength: 12, trim: true},
  date: {type:String,maxlength: 12, match: /\d\d\d\d-\d\d-\d\d/,trim: true}
});


module.exports = mongoose.model('Statistic', Statistic);
