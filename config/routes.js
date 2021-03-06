
/**
 * Module dependencies.
 */


// controllers
var UserController =  require('../app/controllers/UserController');
var AuthenticationController = require('../app/controllers/AuthenticationController');
var AuthorizationController =  require('../app/controllers/AuthorizationController');
var PartyController = require('../app/controllers/PartyController');
var StateController = require('../app/controllers/StateController');
var PoliticianController =  require('../app/controllers/PoliticianController');

var CommentController =  require('../app/controllers/CommentController');

var AppLogger = require('../app/common/AppLogger');

var express = require('express');

/**
 * Expose
 */

module.exports = function (app,sequelize) {
	var userController =  new UserController(app);
	var authenticationController = new AuthenticationController(app);
	var authorizationController = new AuthorizationController(app);
	var stateController = new StateController(app);
	var politicianController = new PoliticianController(app);
	var partyController  = new PartyController(app);
	var commentController = new CommentController(app);

	// get the user information...
	app.get('/api/v1/user',
		authenticationController.isAuthenticated,
		function(req,res){
			AppLogger.log('info', 'GET /api/v1/user called');
			userController.get(req,res);
	});

	/** adding a account or new user **/
	app.post('/api/v1/user', function(req,res){

		AppLogger.log('info', 'POST /api/v1/user called with body : ' + req);
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
		function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/rate called');

			politicianController.rate(req,res);
		});

	/** favorite a politician  **/
	app.post('/api/v1/politician/:politicianId/favorite',
		authenticationController.isAuthenticated,
		function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/favorite called');
			politicianController.favorite(req,res);
	});

	/** post comment on a politician  **/
	app.post('/api/v1/politician/:politicianId/comment',
		authenticationController.isAuthenticated,
		politicianController.checkPoliticianId,
		function(req,res){
			AppLogger.log('info', 'POST /api/v1/politician/:politicianId/comment called');
			commentController.post(req,res);
	})


	/** get comment on a politician  **/
	app.get('/api/v1/politician/:politicianId/comment'
		,politicianController.checkPoliticianId,
		function(req,res){
			AppLogger.log('info', 'GET /api/v1/politician/:politicianId/comment called');
			commentController.get(req,res);
	})

	/** delete a comment on a politician  **/
	app.delete('/api/v1/politician/:politicianId/comment/:commentId'
		,politicianController.checkPoliticianId //check if politician exists
		,commentController.checkCommentId //check if the commentId exists
		,authenticationController.isAuthenticated
		,authorizationController.isCommentOwner //delete comment if you own it....
		,

//		authenticationController.isAuthenticated,
		function(req,res){
			AppLogger.log('info', 'DELETE /api/v1/politician/:politicianId/comment called');
			commentController.delete(req,res);
		}
	)


	/** change a comment on a politician  **/
	app.put('/api/v1/politician/:politicianId/comment/:commentId'
		,politicianController.checkPoliticianId
		,commentController.checkCommentId
		,authenticationController.isAuthenticated
		,authorizationController.isCommentOwner,


		function(req,res){
			AppLogger.log('info', 'GET /api/v1/politician/:politicianId/comment called');
			commentController.put(req,res);
		}
	)



	/** get all the state **/
	app.get('/api/v1/state', function(req,res){
		AppLogger.log('info', 'GET /api/v1/state called');

		stateController.get(req,res);
	})

	/** get all the constituency for state **/
	app.get('/api/v1/state/:stateId', function(req,res){
		AppLogger.log('info', 'GET /api/v1/state/:stateId/constituency called');

		stateController.getConstituencies(req,res);
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

	/** get all the politicians in party **/
	app.get('/api/v1/party/:partyId', function(req,res){
		AppLogger.log('info', 'GET /api/v1/party/partyId called');
		partyController.getMembers(req,res);
	})



//	// Serve up swagger ui at /docs via static route
//	var docs_handler = express.static(__dirname + '../node_modules/swagger-node-express/swagger-ui-1.1.13/');
//	app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
//		AppLogger.info('GET /docs');
//		if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
//			AppLogger.info('Second Stuff');
//			res.writeHead(302, { 'Location' : req.url + '/' });
//			res.end();
//			return;
//		}
//		// take off leading /docs so that connect locates file correctly
//		req.url = req.url.substr('/docs'.length);
//		AppLogger.info('Stripped url:::' + req.url);
//		return docs_handler(req, res, next);
//	});





}

