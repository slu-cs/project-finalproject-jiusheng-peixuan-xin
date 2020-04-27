const Statistic = require('../models/statistic');

module.exports.index = function(request, response, next) {
  Statistic.distinct('_id')
    .then(statisticIDs => response.redirect(`/statistics/${statisticIDs[0]}`))
    .catch(error => next(error));
 };

module.exports.retrieve = function(request, response, next) {
  const queries = [
    Statistic.findById(request.params.id),
    Statistic.distinct('_id')
  ];

  Promise.all(queries).then(function([statistic, statisticIDs]) {
    if (statistic) {
      response.render('statistics/index', {statistic: statistic, statisticIDs: statisticIDs});
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
