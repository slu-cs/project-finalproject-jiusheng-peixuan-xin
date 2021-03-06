const County = require('../models/county');

// GET /qas//hii
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'name';
  County.find().sort(order)
    .then(counties => response.render('counties/index', {counties: counties, order: order}))
    .catch(error => next(error));
 };

 // PUT /qas/:id (with the changes in the request body)
 module.exports.update = function(request, response, next) {
   County.findByIdAndUpdate(request.params.id, request.body, {runValidators: true})
     .then(county => county ? response.status(200).end() : next())
     .catch(error => next(error));
 };
