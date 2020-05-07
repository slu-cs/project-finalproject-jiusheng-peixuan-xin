// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const Qa = new mongoose.Schema({
  question:{type:String, required: true, maxlength: 1000, trim:false},
  answer:{type:String, maxlength: 1000, trim:false}
});

Qa.index( { question: "text", answer: "text" } )

// Export the model
module.exports = mongoose.model('Qa', Qa);
