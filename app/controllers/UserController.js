/*
 *  User Controller class...
 *  Allows adding users , accounts, relogin...
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();

var userController = (function() {
	var User;

	function UserController(app){
		AppLogger.info('Enter UserController constructor ' + app);
		User =  app.get('models').User;
	}

	UserController.prototype.get = function(req, res){
		AppLogger.info('UserController:get');
		var userId = req.header('UserId');

		User.find(userId).success(function(user) {
			if (user) {
				AppLogger.info("User Found in db" + JSON.stringify(user));


			} else {
				AppLogger.info("User Not Found in db " + JSON.stringify(user));
				//todo move to strings..
				var response = responseUtils.get(401, 'UserId Not Found in the Database', 'Error', true);
				AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response)

			}


		}).error(function(err){
			AppLogger.info("User Not Found in db");
		});

//		res.send('TODO - UserController:get');


	}

	//todo use promise.js instead of this structure - the callbacks are messy...
	UserController.prototype.post = function(req, res){
		AppLogger.info('UserController:post body is :' + req.body);
		if (req.body===undefined||req.body=="{}"){
			AppLogger.info('No request body');
			var response = responseUtils.get(666, 'Request Body Missing', 'Error', true);
			AppLogger.log('info', "response returned:" + JSON.stringify(response));
			res.send(response);
		} else {
			User.findOrCreate(req.body).success(function(user,created){

				console.log(user.id);
				console.log(created);
				var response = responseUtils.get(200, JSON.stringify(user), 'User', false);
				res.send(response);

			}).error(function(error){
				var response = responseUtils.get(666, 'Error in User Login:' +JSON.stringify(error), 'Error', true);
				AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response);
			})

		}


	}

	var testUser = {
		name: "Gaurav Gupta",
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		email: "Email"
	}

	UserController.prototype.addUserToDB = function(userVal){
//		AppLogger.info('UserController:addUserToDB: ' + JSON.stringify(userVal));
//		AppLogger.info('UserController:addUserToDB: ' + JSON.stringify(testUser));

		var user = User.build(testUser);
		console.log('User is:::'  + JSON.stringify(user));
//		console.log('User is ' + User);
		user.save().success(function(user){
			console.log('success User is:::'  + JSON.stringify(user));
		}).error(function(error){
			console.log('error');
		});

//		User.sync({force:true});
//		console.log('success User is:::'  + JSON.stringify(user));

//		user.save().success(function(success){
//			 console.log("successs");
//		}).error(function(error){
//				console.log("error");
//
//		})
	}

	UserController.prototype.addDevice = function(req, res) {
	}

	UserController.prototype.updateDevice = function(req, res) {
	}

	UserController.prototype.removeDevice = function(req, res) {
	}






	//todo check how to validate proper json?
	UserController.validatePostParams = function(req) {

	};

	UserController.containsDevice = function(devices, deviceRegistrationId){

	}

	UserController.containsAccount = function(accounts, newAccount){

	}




	return UserController;

})()

module.exports = userController;

