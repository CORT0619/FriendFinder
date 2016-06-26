var path = require('path');

module.exports = function(app){

	// if user types in /survey then routes to public/survey.html
	app.get('/survey', function(request, response){

		response.sendFile(path.join(__dirname, '..', 'public', 'survey.html'));
	});

	//default route
	app.use(function(request, response){

		response.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
	})

};