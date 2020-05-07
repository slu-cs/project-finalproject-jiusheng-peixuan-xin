// Model for the course collection.
const mongoose = require('mongoose');

// Define the schema
const County = new mongoose.Schema({================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
  _id: {type:String, required: true, maxlength: 100},
  name: {type:String, required: true, maxlength:100, trim:false},
  date: {type:Date,required: true},
  confirmed: {type:Number,required: true, maxlength:11},
  death: {type:Number,required: true, maxlength:11}
});


module.exports = mongoose.model('County', County);
