const County = require('../models/county');

// GET /qas
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'name';
  County.find()
    .then(counties => response.render('latest/index', {counties: counties, order: order}))
    .catch(error => next(error));
 };
