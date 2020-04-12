// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Qa = new mongoose.Schema({
  _id: String,
  question:String,
  answer:String
});
//changes
// Export the model
module.exports = mongoose.model('Qa', Qa);
