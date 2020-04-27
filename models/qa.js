// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Qa = new mongoose.Schema({
  question:String,
  answer:String
});
Qa.index( { question: "text", answer: "text" } )
// Export the model
module.exports = mongoose.model('Qa', Qa);
