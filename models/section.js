// Model for the section collection.
const mongoose = require('mongoose');

// Define the schema
const Section = new mongoose.Schema({
  course: String,
  day: String,
  time: Date,
  instructor: String
});

// Convert incoming time strings to Date objects
Section.path('time').set(function(time) {
  return new Date(`1/15/2020 ${time}`);
});

// Provide a 12-hour time string as a virtual property
Section.virtual('time12').get(function() {
  return this.time.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});
});

// Provide a 24-hour time string as a virtual property
Section.virtual('time24').get(function() {
  return this.time.toLocaleTimeString('en-US', {hour12: false});
});

// Export the model
module.exports = mongoose.model('Section', Section);
