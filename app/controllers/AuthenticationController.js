/**
 * Authentication controller class
 * Checks if the user is authenticated to see the content...
 */


var AppLogger = require('../common/AppLogger');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();


var authentication_controller = (function() {
	var User;

	/**
	 * Authorization Controller actions.
	 */
	function AuthenticationController(app){
	   AppLogger.log('info', 'AuthenticationController::constructor');
	   User = app.get('models').User;
	}



	AuthenticationController.prototype.isAuthenticated = function (req,res,next) {
		AppLogger.log('info', 'AuthenticationController::isAuthenticated');
		var userId = req.header('UserId');
		AppLogger.log('info', "userId in the header: " + userId);
		if (userId===undefined) {
			//todo move to strings..
			AppLogger.log('info', "userId is undefined");
			var response = responseUtils.get(401, 'UserId missing in the request', 'Error', true);
			AppLogger.log('info', "response returned:" + JSON.stringify(response));
			res.send(response)
		} else {
			User.find(userId).success(function(user){
				AppLogger.log('info', "userId found " + JSON.stringify(user));
				if (user == null){
					var response = responseUtils.get(401, 'User not found in database', 'Error', true);
					AppLogger.log('info', "response returned:" + JSON.stringify(response));
					res.send(response);
				}  else {
					req.user = user;
					next();
				}
			}).error(function(error){
				var response = responseUtils.get(401, 'User not found in database', 'Error', true);
				AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response);
			})
			//check in db...
			//todo
//			next();
		}


	}

	return AuthenticationController;

})();

module.exports = authentication_controller;



