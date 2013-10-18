
/**
 * Module dependencies.
 */


// controllers
var userController =  new (require('../app/controllers/UserController'))();
var authenticationController = new (require('../app/controllers/AuthenticationController'))();
var authorizationController = new (require('../app/controllers/AuthorizationController'))();
var stateController = new (require('../app/controllers/StateController'))();
var politicianController = new (require('../app/controllers/PoliticianController'))();


var AppLogger = require('../app/common/AppLogger');

/**
 * Expose
 */

module.exports = function (app) {

	// get the user information...
	app.get('/api/v1/user',
		authenticationController.isAuthenticated,
		function(req,res){
			AppLogger.log('info', 'GET /api/v1/user called');
			userController.get(req,res);
	});

	/** adding a account or new user **/
	app.post('/api/v1/user', function(req,res){

		AppLogger.log('info', 'POST /api/v1/user called');
		userController.post(req,res);
	});


	/** get for politician list **/
	app.get('/api/v1/politician', function(req,res) {

		AppLogger.log('info', 'GET /api/v1/politician called');
		politicianController.get(req,res);
	});


	/** get for politician list **/
	app.get('/api/v1/politician/:politicianId', function(req,res) {

		AppLogger.log('info', 'GET /api/v1/politician/:politicianId called');
		politicianController.getDetails(req,res);
	});


	/** rate a politician  **/
	app.post('/api/v1/politician/:politicianId/rate',
		authenticationController.isAuthenticated,
		authorizationController.isAuthorized, function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/rate called');

			politicianController.rate(req,res);
		});

	/** favorite a politician  **/
	app.post('/api/v1/politician/:politicianId/favorite',
		authenticationController.isAuthenticated,
		authorizationController.isAuthorized, function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/favorite called');

			politicianController.favorite(req,res);
	});

	/** comment on a politician  **/
	app.post('/api/v1/politician/:politicianId/comment',
		authenticationController.isAuthenticated,
		authorizationController.isAuthorized, function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/comment called');

			politicianController.comment(req,res);
	})

	/** get all the state **/
	app.get('/api/v1/state', function(req,res){
		AppLogger.log('info', 'GET /api/v1/state called');

		stateController.get(req,res);
	})

	/** get all the constituency for state **/
	app.get('/api/v1/state/:stateId/constituency', function(req,res){
		AppLogger.log('info', 'GET /api/v1/state/:stateId/constituency called');

		stateController.getConstituencies(req,res);
	})

	/** get all the party **/
	app.get('/api/v1/party', function(req,res){
		AppLogger.log('info', 'GET /api/v1/party/ called');
		partyController.get(req,res);
	})






}

