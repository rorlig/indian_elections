/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */


var AppLogger = require('../common/AppLogger');





var authorization_controller = (function() {

	/**
	 * Authorization Controller actions.
	 * @param app
	 */
	function AuthorizationController(){

	}


	//assigns the role for a user to a particular event
	//roles are checkedInUser or notCheckedInUser
	AuthorizationController.prototype.isAuthorized = function (req,res,next) {
		//todo
		next();
	}




	return AuthorizationController;

})();

module.exports = authorization_controller;



