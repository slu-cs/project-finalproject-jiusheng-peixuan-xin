const Qa = require('../models/qa');

// GET /qas
module.exports.index = function(request, response, next) {
  Qa.distinct('_id')
    .then(qaId => response.redirect(`/qas/${qaId[0]}`))
    .catch(error => next(error));
 };

// GET /qas/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Qa.findById(request.params.id),
    Qa.distinct('_id')
  ];

  Promise.all(queries).then(function([qas, qaId]) {
    if (qas) {
      response.render('qas/index', {qas: qas, qaId: qaId});
    } else {
      next();
    }
  }).catch(error => next(error));
};
