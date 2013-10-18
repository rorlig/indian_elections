/**
 * Authentication controller class
 * Checks if the user is authenticated to see the content...
 */


var AppLogger = require('../common/AppLogger');




var authentication_controller = (function() {

	/**
	 * Authorization Controller actions.
	 */
	function AuthenticationController(){
	   AppLogger.log('info', 'AuthenticationController::constructor');
	}



	AuthenticationController.prototype.isAuthenticated = function (req,res,next) {
		AppLogger.log('info', 'AuthenticationController::isAuthenticated');

		//todo
		next();
	}

	return AuthenticationController;

})();

module.exports = authentication_controller;



