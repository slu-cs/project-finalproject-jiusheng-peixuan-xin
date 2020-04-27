const County = require('../models/county');

// GET /qas
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'name';
  County.find().sort(order)
    .then(counties => response.redirect('latest/index', {counties: counties, order: order}))
    .catch(error => next(error));
 };
