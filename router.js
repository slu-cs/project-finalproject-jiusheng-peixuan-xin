// Router for content requests.
const express = require('express');
const qas = require('./controllers/qas');
const statistics = require('./controllers/statistics');
const counties = require('./controllers/counties');

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

router.get('/counties', counties.index);
router.put('/counties/:id', authorize, counties.update);

// Handle section requests
router.get('/qas', qas.index);
router.post('/qas', qas.create);
router.delete('/qas/:id', authorize, qas.delete);
router.put('/qas/:id', authorize, qas.update);

router.get('/statistics', statistics.index);
router.post('/statistics', authorize, statistics.create);



// Export the router
module.exports = router;
