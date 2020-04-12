// Router for content requests.
const express = require('express');
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

// Handle section requests
router.get('/qas', qas.index);
router.get('/qas/:id', qas.retrieve);

router.get('/statistics', statistics.index);
router.get('/statistics/:id', statistics.retrieve);

// Export the router
module.exports = router;
