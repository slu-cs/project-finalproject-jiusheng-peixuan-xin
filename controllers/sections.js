// Controller for the section collection.
const Section = require('../models/section');

// GET /sections?sort=
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'course'; // Default to sort by course

  Section.find().sort(order)
    .then(sections => response.render('sections/index', {sections: sections, order: order}))
    .catch(error => next(error));
};

// POST /sections (with the new section in the request body)
module.exports.create = function(request, response, next) {
  Section.create(request.body)
    .then(section => response.status(201).send(section.id))
    .catch(error => next(error));
};

// DELETE /sections/:id
module.exports.delete = function(request, response, next) {
  Section.findByIdAndDelete(request.params.id)
    .then(section => section ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /sections/:id (with the changes in the request body)
module.exports.update = function(request, response, next) {
  Section.findByIdAndUpdate(request.params.id, request.body)
    .then(section => section ? response.status(200).end() : next())
    .catch(error => next(error));
};
