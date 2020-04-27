const Statistic = require('../models/statistic');

module.exports.index = function(request, response, next) {
  Statistic.distinct('_id')
    .then(statisticID => response.redirect(`/statistics/${statisticID[0]}`))
    .catch(error => next(error));
 };

/*
 module.exports.index = function(request, response, next) {
   const order = request.query.sort || 'day'; // Default to sort by date

   const queries = [
     Statistic.find().sort(order),
     Statistic.distinct('_id')
   ];

   Promise.all(queries).then(function([statistics, statisticID]) {
     response.render('statistics/index', {statistics: statistics, order: order, statisticID: statisticID});
   }).catch(error => next(error));
 };
*/
// GET /counties/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Statistic.findById(request.params.id),
    Statistic.distinct('_id')
  ];

  Promise.all(queries).then(function([statistic, statisticID]) {
    if (statistic) {
      response.render('statistics/index', {statistic: statistic, statisticID: statisticID});
    } else {
      next();
    }
  }).catch(error => next(error));
};

//p2
// POST /statistics (with the new statistic in the request body)
module.exports.create = function(request, response, next) {
  Statistic.create(request.body)
    .then(statistic => response.status(201).send(statistic.id))
    .catch(error => next(error));
};

// DELETE /statistics/:id
module.exports.delete = function(request, response, next) {
  Statistic.findByIdAndDelete(request.params.id)
    .then(statistic => statistic ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /statistics/:id (with the changes in the request body)
module.exports.update = function(request, response, next) {
  Statistic.findByIdAndUpdate(request.params.id, request.body)
    .then(statistic => statistic ? response.status(200).end() : next())
    .catch(error => next(error));
};
