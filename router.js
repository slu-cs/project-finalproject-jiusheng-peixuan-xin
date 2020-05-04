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

// Handle section requests
router.get('/qas', qas.index);
router.get('/qas/:id', qas.retrieve);
router.post('/qas', qas.create);
router.delete('/qas/:id', authorize, qas.delete);
router.put('/qas/:id', authorize, qas.update);

router.get('/statistics', statistics.index);
router.get('/statistics/:id', statistics.retrieve);
router.post('/statistics', authorize, statistics.create);
router.delete('/statistics/:id', authorize, statistics.delete);
router.put('/statistics/:id', authorize, statistics.update);

// Export the router
module.exports = router;
