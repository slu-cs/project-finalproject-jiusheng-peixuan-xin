// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const County = new mongoose.Schema({
  _id: {type:String, required: true},
  name: {type:String, maxlength:50},
  date: {type:String,maxlength: 12, match: /\d\d\d\d-\d\d-\d\d/,trim: true},
  confirmed: {type:Number, maxlength: 12, trim: true},
  death: {type:Number, maxlength: 12, trim: true}
});


module.exports = mongoose.model('County', County);
