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
  name: String,
  date: String,
  confirmed: Number,
  death: Number
});

*/
const counties = [];
// statistic collection
/*
const Statistic = new mongoose.Schema({
  county: String,
  confirmed: Number,
  death: Number,
  day: String
});
*/
const statistics = [];

const getCounty = function(arr, stat) {
  for (let r of arr) {
    if (Object.is(r.name, stat.county)) {
      r.confirmed = stat.confirmed;
      r.death = stat.death;
      r.date = stat.date;
      return arr;
    }
  }
  arr.push(new County({
    name: stat.county,
    confirmed: stat.confirmed,
    death: stat.death,
    date: stat.date
  })
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
  new Qa({question: 'Is there any cases found in canton?', answer: 'Yes there is one case found last month.'}),
  new Qa({question: 'Sample question?', answer: 'Sample answer.'}),
  new Qa({question: 'where can i get tested?', answer :"please visit CDC website for more info"})
];

// Asynchronous line-by-line input
file.on('line', function(line){
  const info = line.split(','); // date, county, state, fips, cases, deaths
  if (Object.is(info[2], 'New York') && !Object.is(info[1], 'Unknown')) {
    statistics.push(new Statistic({
      county: info[1],
      confirmed: info[4],
      death: info[5],
      date: info[0]
    }));
  }
});


// End the program when the file closes
file.on('close', function() {
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(statistics.map(statistic => statistic.save())))
    .then(() => {
      for (const s of statistics) {
        getCounty(counties, s);
      }
    })
    .then(() => Promise.all(counties.map(county => county.save())))
    .then(() => Promise.all(qas.map(qa => qa.save())))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});
