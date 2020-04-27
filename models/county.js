// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const County = new mongoose.Schema({
  name: String,
  date: String,
  confirmed: number,
  death: number
});


module.exports = mongoose.model('County', County);
