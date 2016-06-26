var path = require('path');

//require the data
var friends = require('../data/friends.js');

module.exports = function(app){

	app.get('/api/friends', function(request, response){

		response.json(friends); // may need to revise
	});

}