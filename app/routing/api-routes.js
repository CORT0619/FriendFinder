var path = require('path');

//require the data
var friends = require('../data/friends.js').friends;

module.exports = function(app){

	app.get('/api/friends', function(request, response){

		response.json(friends); // may need to revise
	});

	app.post('/api/friends', function(request, response){

		var newFriend = request.body;

		friends.push(newFriend);

		response.json(friends);
	});

}