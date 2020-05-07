const County = require('../models/county');

// GET /qas//hi
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'name';
  County.find().sort(order)
    .then(counties => response.render('counties/index', {counties: counties, order: order}))
    .catch(error => next(error));
 };

 module.exports.retrieve = function(request, response, next) {
   const queries = [
     County.findById(request.params.id),
     County.distinct('_id')
   ];

   Promise.all(queries).then(function([county, countyIds]) {
     if (qa) {
       response.render('counties/index', {county: county, countyIds: countyIds});
     } else {
       next();
     }
   }).catch(error => next(error));
 };

 // PUT /qas/:id (with the changes in the request body)
 module.exports.update = function(request, response, next) {
   County.findByIdAndUpdate(request.params.id, request.body)
     .then(county => county ? response.status(200).end() : next())
     .catch(error => next(error));
 };
