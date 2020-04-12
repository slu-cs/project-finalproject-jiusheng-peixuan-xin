// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Statistic = new mongoose.Schema({
  _id:String,
  county: String,
  confirmed: [Number],
  death: [Number],
  day: [String]
});

module.exports = mongoose.model('Statistic', Statistic);
