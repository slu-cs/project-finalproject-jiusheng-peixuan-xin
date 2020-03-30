// Router for content requests.
const express = require('express');
const courses = require('./controllers/courses');
const sections = require('./controllers/sections');

// Create the router
const router = express.Router();

// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};

// Handle course requests
router.get('/courses', courses.index);
router.get('/courses/:id', courses.retrieve);
router.post('/courses', authorize, courses.create);
router.delete('/courses/:id', authorize, courses.delete);
router.put('/courses/:id', authorize, courses.update);

// Handle section requests
router.get('/sections', sections.index);
router.post('/sections', authorize, sections.create);
router.delete('/sections/:id', authorize, sections.delete);
router.put('/sections/:id', authorize, sections.update);

// Export the router
module.exports = router;
