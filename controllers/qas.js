const Qa = require('../models/qa');

// GET /qas
module.exports.index = function(request, response, next) {
  Qa.find()
    .then(qas => response.render('qas/index', {qas: qas, order: Default}))
    .catch(error => next(erro));
 };

// GET /qas/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Qa.findById(request.params.id),
    Qa.distinct('_id')
  ];

  Promise.all(queries).then(function([qas, qaId]) {
    if (qa) {
      response.render('qas/index', {qa: qa, qaId: qaId});
    } else {
      next();
    }
  }).catch(error => next(error));
};
