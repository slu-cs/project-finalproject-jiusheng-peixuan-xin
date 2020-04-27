// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const County= require('./models/county');
const Qa = require('./models/qa');
const Statistic = require('./models/statistic');

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
    day: [info[0]]})
  );
  return arr;
};

// qa collection
/*
const Qa = new mongoose.Schema({
  question:String,
  answer:String
});
*/
const qas = [
  new Qa({question: 'How to protect ourselves from getting infected?', answer: 'Wash your hand, wear facial masks, keep social distance'}),
  new Qa({question: 'Is there any cases found in caton?', answer: 'Yes there is one case found last month.'}),
  new Qa({question: 'Sample question?', answer: 'Sample answer.'}),
];

// Asynchronous line-by-line input
file.on('line', function(line){
  const info = line.split(','); // date, county, state, fips, cases, deaths
  if (Object.is(info[2], 'New York')) {
    getStatistic(statistics, info);
  }
});

for (const s of statistics) {
  counties.push(new County({name: s.county,
    date: s.day[s.day.length - 1],
    confirmed: s.confirmed[s.day.length - 1],
    death: s.death[s.day.length - 1]
  }));
}

// End the program when the file closes
file.on('close', function() {
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(statistics.map(statistic => statistic.save())))
    .then(() =>
    for (const s of statistics) {
      counties.push(new County({name: s.county,
        date: s.day[s.day.length - 1],
        confirmed: s.confirmed[s.day.length - 1],
        death: s.death[s.day.length - 1]
      }));
    })
    .then(() => Promise.all(counties.map(county => county.save())))
    .then(() => Promise.all(qas.map(qa => qa.save())))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});
