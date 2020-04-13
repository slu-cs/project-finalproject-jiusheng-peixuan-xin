const Statistic = require('../models/statistic');

// GET /statistics?sort=
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'day'; // Default to sort by date
  Statistic.find().sort(order)
    .then(statistics => response.render('statistics/index', {statistics: statistics, order: order}))
    .catch(error => next(error));
  /*
  Statistic.distinct('_id')
    .then(statisticId => response.redirect(`/statistics/${statisticId[0]}`))
    .catch(error => next(error));
  */
 };

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
