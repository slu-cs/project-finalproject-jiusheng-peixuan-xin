// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const QA = new mongoose.Schema({
  question:String,
  answer:String
});

// Export the model
module.exports = mongoose.model('QA', QA);
