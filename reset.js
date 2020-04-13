// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const County= require('./models/county');
const Qa = require('./models/qa');
const Statistics = require('./models/statistic');

// Connect to the database
connect();

const readline = require('readline');
const fs = require('fs');
// File configuration
const file = readline.createInterface({
  input: fs.createReadStream('./us-counties.csv')
});

// county collection
/*
const County = new mongoose.Schema({
  name: String
});
*/
const counties = [];

const getCounty = function(arr, item) {
  // prevent duplication
  for (let r of arr) {
    if (Object.is(r.name, item)) {
      return arr;
    }
  }
  arr.push(new County({name: item}));
  return arr;
};

// statistic collection
/*
const Statistic = new mongoose.Schema({
  _id:String,
  county: String,
  confirmed: [Number],
  death: [Number],
  day: [String]
});
*/
const statistics = [];

const getStatistic = function(arr, info) {
  for (let r of arr) {
    if (Object.is(r._id, info[1])) {
      r.confirmed.push(info[4]);
      r.death.push(info[5]);
      r.day.push(info[0]);
      return arr;
    }
  }
  arr.push(new Statistic({
    _id:info[1],
    county: info[1],
    confirmed: [info[4]],
    death: [info[5]],
    day: [info[0]]}));
  return arr;
};

// Asynchronous line-by-line input
file.on('line', function(line){
  const info = line.split(','); // date, county, state, fips, cases, deaths

  if (info[0] != 'date') {
    getCounty(counties, info[1]);
    getStatistic(statistics, info);
  }
});


// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});


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
