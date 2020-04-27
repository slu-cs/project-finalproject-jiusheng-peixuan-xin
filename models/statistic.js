// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Statistic = new mongoose.Schema({
  county: String,
  confirmed: Number,
  death: Number,
  date: String
});

module.exports = mongoose.model('Statistic', Statistic);
