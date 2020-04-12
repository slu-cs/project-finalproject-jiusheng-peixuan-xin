// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const County= require('./models/county');
const Qa = require('./models/qa');
const Statistics = require('./models/statistic');

// Connect to the database
connect();

/*
const County = new mongoose.Schema({
  name: String
});
*/
// Model a collection of courses
const counties = [
  new County({name: 'St.Lawrence'}),
  new County({name: 'Lewis'}),
  new County({name: 'New York'})
];

/*
const Statistic = new mongoose.Schema({
  _id:String,
  county: String,
  confirmed:Number,
  death:Number,
  day:Date
});
*/

// Model a collection of sections
const statistics = [
  new Statistics({_id:'SL',county: counties[0].name, confirmed:0, death:0, day:"April 1"}),
  new Statistics({_id:'LE',county: counties[1].name, confirmed:6, death:1, day:"April 1"}),
  new Statistics({_id:'NY',county: counties[2].name, confirmed:1000, death:10, day:"April 1"})
];

/*
const Qa = new mongoose.Schema({
  _id: String,
  question:String,
  answer:String
});
*/
const qas = [
  new Qa({_id:'q1', question: 'Q1', answer: 'A1'}),
  new Qa({_id:'q2', question: 'Q2', answer: 'A2'}),
  new Qa({_id:'q3', question: 'Q3', answer: 'A3'})
];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(counties.map(county => county.save())))
  .then(() => Promise.all(statistics.map(statistic => statistic.save())))
  .then(() => Promise.all(qas.map(qa => qa.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
