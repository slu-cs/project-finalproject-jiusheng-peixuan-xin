const Statistic = require('../models/statistic');

module.exports.index = function(request, response, next) {
  Statistic.distinct('_id')
    .then(statisticId => response.redirect(`/statistics/${statisticId[0]}`))
    .catch(error => next(error));
 };
/*
 // GET /sections?sort=
 module.exports.index = function(request, response, next) {
   const order = request.query.sort || 'day'; // Default to sort by course

   Statistic.find().sort(order)
     .then(statistics => response.render('statistics/index', {statistics: statistics, order: order}))
     .catch(error => next(error));
 };
*/
// GET /counties/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Statistic.findById(request.params.id),
    Statistic.distinct('_id')
  ];

  Promise.all(queries).then(function([statistic, statisticId]) {
    if (statistic) {
      response.render('statistics/index', {statistic: statistic, statisticId: statisticId});
    } else {
      next();
    }
  }).catch(error => next(error));
};

//p2
// POST /statistics (with the new statistic in the request body)
module.exports.create = function(request, response, next) {
  statistic.create(request.body)
    .then(statistic => response.status(201).send(statistic.id))
    .catch(error => next(error));
};

// DELETE /statistics/:id
module.exports.delete = function(request, response, next) {
  statistic.findByIdAndDelete(request.params.id)
    .then(statistic => statistic ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /statistics/:id (with the changes in the request body)
module.exports.update = function(request, response, next) {
  statistic.findByIdAndUpdate(request.params.id, request.body)
    .then(statistic => statistic ? response.status(200).end() : next())
    .catch(error => next(error));
};
