// Router for content requests.
const express = require('express');
const qas = require('./controllers/qas');
const statistics = require('./controllers/statistics');

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

// Handle section requests
router.get('/qas', qas.index);
router.get('/qas/:id', qas.retrieve);
router.post('/qas', authorize, qas.create);
router.delete('/qas/:id', authorize, qas.delete);
router.put('/qas/:id', authorize, qas.update);


router.get('/statistics', statistics.index);
router.get('/statistics/:id', statistics.retrieve);
router.post('/statistics', authorize, statistics.create);
router.delete('/statistics/:id', authorize, statistics.delete);
router.put('/statistics/:id', authorize, statistics.update);

router.get('/:id', function(request, response, next) {
  const qa = qas.find({"question":/request/});
  if (!qa) {
    next(); // Leads to 404
  } else {
    response.send(qa);
  }
});




// Export the router
module.exports = router;
