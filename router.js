// Router for content requests.
const express = require('express');
const county = require('./controllers/county');
const qa = require('./controllers/QA');
const statistics = require('./controllers/statistics');

// Create the router
const router = express.Router();
/*
// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};
*/
// Handle course requests
router.get('/county', county.index);
router.get('/county/:id', county.retrieve);


// Handle section requests
router.get('/qa', statistics.index);
router.get('/qa/:id', statistics.retrieve);
// Export the router
module.exports = router;
