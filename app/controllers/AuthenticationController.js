/**
 * Authentication controller class
 * Checks if the user is authenticated to see the content...
 */


var AppLogger = require('../common/AppLogger');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();


var authentication_controller = (function() {

	/**
	 * Authorization Controller actions.
	 */
	function AuthenticationController(){
	   AppLogger.log('info', 'AuthenticationController::constructor');
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
			//check in db...
			//todo
			next();
		}


	}

	return AuthenticationController;

})();

module.exports = authentication_controller;



