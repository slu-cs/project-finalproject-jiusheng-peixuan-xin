const County = require('../models/county')

// GET /counties
module.exports.index = function(request, response, next) {
  County.distinct('_id')
    .then(countyId => response.redirect(`/counties/${countyId[0]}`))
    .catch(error => next(error));
 };

// GET /counties/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    County.findById(request.params.id),
    County.distinct('_id')
  ];

  Promise.all(queries).then(function([county, countyId]) {
    if (county) {
      response.render('counties/index', {county: county, countyId: countyId});
    } else {
      next();
    }
  }).catch(error => next(error));
};
