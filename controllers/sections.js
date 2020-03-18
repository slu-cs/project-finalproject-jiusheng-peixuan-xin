// Controller for the section collection.
const Section = require('../models/section');

// GET /sections?sort=
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'course'; // Default to sort by course

  Section.find().sort(order)
    .then(sections => response.render('sections/index', {sections: sections, order: order}))
    .catch(error => next(error));
};
