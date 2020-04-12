const QA = require('../models/QA');


module.exports.index = function(request, response) {
  response.send('GET /qas');
};
