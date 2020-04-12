const Qa = require('../models/qa');

// GET /counties
module.exports.index = function(request, response, next) {
  County.distinct('_id')
    .then(countyId => response.redirect(`/qas/${qaId[0]}`))
    .catch(error => next(error));
 };

// GET /counties/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Qa.findById(request.params.id),
    Qa.distinct('_id')
  ];

  Promise.all(queries).then(function([qa, qaId]) {
    if (county) {
      response.render('qas/index', {qa: qa, qaId: qaId});
    } else {
      next();
    }
  }).catch(error => next(error));
};
