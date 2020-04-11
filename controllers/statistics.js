module.exports.index = function(request, response) {
  response.send('GET /statistics');
};

module.exports.retrieve = function(request, response) {
  response.send(`GET /statistics/${request.params.id}`);
};
