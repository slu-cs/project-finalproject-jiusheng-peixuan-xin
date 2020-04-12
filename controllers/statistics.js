const Statistics = require('../models/statistics');

// GET /statistics?sort=

module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'county';

  Statistics.find().sort(order)
    .then(statistics => response.render('statistics/index', {statistics: statistics, order: order}))
    .catch(error => next(error));
};
