const County = require('../models/county');

// GET /qas//hi
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'name';
  County.find().sort(order)
    .then(counties => response.render('counties/index', {counties: counties, order: order}))
    .catch(error => next(error));
 };
