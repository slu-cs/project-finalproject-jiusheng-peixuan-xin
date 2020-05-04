// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const County = new mongoose.Schema({
  _id: String,
  name: String,
  date: String,
  confirmed: Number,
  death: Number
});


module.exports = mongoose.model('County', County);
