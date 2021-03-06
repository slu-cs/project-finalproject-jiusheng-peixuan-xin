const Qa = require('../models/qa');

// GET /qas
module.exports.index = function(request, response, next) {
  const keyword = request.query.keyword ;
  if(!keyword){
    Qa.find()
      .then(qas => response.render('qas/index', {qas: qas,keyword:keyword}))
      .catch(error => next(error));
  }else{
    Qa.find({$text: { $search: keyword } })
      .then(qas => response.render('qas/index', {qas: qas,keyword:keyword}))
      .catch(error => next(error));
  }

 };


//Phase two
// POST /qas (with the new qa in the request body)
module.exports.create = function(request, response, next) {
  // set undefined for the answer is null
  request.body.answer = "";
  Qa.create(request.body)
    .then(qa => response.status(201).send(qa.id))
    .catch(error => next(error));
};

// DELETE /qas/:id
module.exports.delete = function(request, response, next) {
  Qa.findByIdAndDelete(request.params.id)
    .then(qa => qa ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /qas/:id (with the changes in the request body)
module.exports.update = function(request, response, next) {
  Qa.findByIdAndUpdate(request.params.id, request.body, {runValidators: true})
    .then(qa => qa ? response.status(200).end() : next())
    .catch(error => next(error));
};
