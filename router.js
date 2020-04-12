// Router for content requests.
const express = require('express');
const counties = require('./controllers/counties');
const qas = require('./controllers/qas');
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
router.get('/counties', counties.index);
router.get('/counties/:id', counties.retrieve);


// Handle section requests
router.get('/qas', qas.index);
router.get('/qas/:id', qas.retrieve);

// Export the router
module.exports = router;
