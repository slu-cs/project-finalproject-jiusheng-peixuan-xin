const Statistic = require('../models/statistic');
/*
module.exports.index = function(request, response, next) {
  Statistic.distinct('_id')
    .then(statisticIDs => response.redirect(`/statistics/${statisticIDs[0]}`))
    .catch(error => next(error));
 };
*/
 module.exports.index = function(request, response, next) {
   const order = request.query.sort || 'date'; // Default to sort by course

   Statistic.find().sort(order)
     .then(statistics => response.render('statistics/index', {statistics: statistics, order: order}))
     .catch(error => next(error));
 };


//p2
// POST /statistics (with the new statistic in the request body)
module.exports.create = function(request, response, next) {
  Statistic.create(request.body)
    .then(statistic => response.status(201).send(statistic.id))
    .catch(error => next(error));
};
