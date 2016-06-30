var path = require('path');
//var modal = require('jquery.modal');

//require the data
var friends = require('../data/friends.js').friends;
var totalDiff = 0;
var allDiffs = [];
var bestMatch = 0;

module.exports = function(app){

	app.get('/api/friends', function(request, response){

		response.json(friends); // may need to revise
	});

	app.post('/api/friends', function(request, response){

		console.log("friends length " + friends.length);

		for(var j=0; j < friends.length; j++){

			for(var i=0; i < 10; i++){

				totalDiff += Math.abs(parseInt(request.body.scores[i]) - parseInt(friends[j].scores[i]));
			}
			allDiffs.push(totalDiff);
			totalDiff = 0;
		}

		console.log("allDiffs length " + allDiffs.length);

		for(var x = 1; x < allDiffs.length; x++){

			if(allDiffs[x] < allDiffs[bestMatch])
				bestMatch = x;
		}	

		console.log("allDiffs is ");

		for(var i=0; i < allDiffs.length; i++){
			console.log(allDiffs[i]);
		}

		var html = "<html><head><body><p>" + bestMatch + "</p></body></html>";

		var newFriend = request.body;

		friends.push(newFriend);

		response.send(html);
		console.log("best match is " + bestMatch);

		allDiffs.length = 0;
	});

}