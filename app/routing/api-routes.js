var path = require('path');

//require the data
var friends = require('../data/friends.js').friends;
var totalDiff = 0;
var allDiffs = [];
var bestMatch = 0;
var matchedPic = "";
var matchedName = "";

module.exports = function(app){

	app.get('/api/friends', function(request, response){

		response.json(friends); // may need to revise
	});

	app.post('/api/friends', function(request, response){

		for(var j=0; j < friends.length; j++){

			for(var i=0; i < 10; i++){

				totalDiff += Math.abs(parseInt(request.body.scores[i]) - parseInt(friends[j].scores[i]));
			}
			allDiffs.push(totalDiff);
			totalDiff = 0;
		}

		//console.log("allDiffs length " + allDiffs.length);

		for(var x = 1; x < allDiffs.length; x++){

			if(allDiffs[x] < allDiffs[bestMatch])
				bestMatch = x;
		}	

		/*console.log("allDiffs is ");

		for(var i=0; i < allDiffs.length; i++){
			console.log(allDiffs[i]);
		}*/

		

		var newFriend = request.body;

		friends.push(newFriend);

		allDiffs.length = 0;

		matchedPic = JSON.stringify(friends[bestMatch].photo);
		matchedName = JSON.stringify(friends[bestMatch].name);

		matchedName = matchedName.replace(/\"/g, "");

		//console.log("Matched pic is: " + matchedPic);

		var html = '<p style="text-align: center"><img src=' + matchedPic + ' alt="Matched Friend" height="200" width="200"><br />' + matchedName + '</p>';

		//console.log("best match is " + bestMatch);

		response.send(html);


		
		//response.json(friends);

	});

}