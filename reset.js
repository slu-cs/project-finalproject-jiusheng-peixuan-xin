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
  name: String,
  statistics:String
});
*/
// Model a collection of courses
//Statistics are all made up by Jiusheng
const counties = [
  new County({_id: 'SL', name: 'St.Lawrence'}),
  new County({_id:'LEW', name: 'Lewis'}),
  new County({_id:'NY', name: 'New York'})
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
  new Statistics({_id:'s_SL',confirmed:0,death:0,day:new Date("2020-04-01")}),
  new Statistics({_id:'s_LE',confirmed:6,death:1,day:new Date("2020-04-01")}),
  new Statistics({_id:'s_NY',confirmed:1000,death:10,day:new Date("2020-04-01")})
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
