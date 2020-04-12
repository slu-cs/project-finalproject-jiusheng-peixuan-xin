const Statistic = require('../models/statistic');

// GET /statistics?sort=

module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'county';

  Statistics.find().sort(order)
    .then(statistics => response.render('statistic/index', {statistic: statistic, order: order}))
    .catch(error => next(error));
};
  
