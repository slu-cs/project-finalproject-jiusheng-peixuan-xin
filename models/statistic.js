// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Statistic = new mongoose.Schema({
  _id:String,
  confirmed:Number,
  death:Number,
  day:Date
});

Statistic.path('day').set(function(day) {
  return new Date(`${day}`);
});

module.exports = mongoose.model('Statistic', Statistic);
