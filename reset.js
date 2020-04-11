// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const  County= require('./models/county');
const Statistics = require('./models/statistics');

// Connect to the database
connect();

/*
const County = new mongoose.Schema({
  name: String,
  statistics:String
});
*/
// Model a collection of courses
//Statistics are all made up by Jiusheng
const counties = [
  new County({name: 'St.Lawrence', statistics: 'SL'}),
  new County({name: 'Lewis', statistics: 'LE'}),
  new County({name: 'New York', statistics: 'NY'})

];

/*
const Statistics = new mongoose.Schema({
  _id:String,
  confirmed:Number,
  death:Number,
  day:Date
});
*/
// Model a collection of sections
//Statistics are all made up by Jiusheng
const statistics = [
  new Statistics({_id:'SL',confirmed:0,death:0,day:new Date("2020-04-01")}),
  new Statistics({_id:'LE',confirmed:6,death:1,day:new Date("2020-04-01")}),
  new Statistics({_id:'NY',confirmed:1000,death:10,day:new Date("2020-04-01")})


];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(counties.map(county => county.save())))
  .then(() => Promise.all(statistics.map(statistic => statistic.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
