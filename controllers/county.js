module.exports.index = function(request, response) {
  response.send('GET /county');
};

module.exports.retrieve = function(request, response) {
  response.send(`GET /county/${request.params.id}`);
};
