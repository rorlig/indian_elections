/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */



var AppLogger = require('../common/AppLogger');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();



var authorization_controller = (function() {
	var Politician;
	var Party;
	var Rating;
	var Comment;
	var Favorite;
	var sequelize;
	/**
	 * Authorization Controller actions.
	 * @param app
	 */
	function AuthorizationController(app){
		AppLogger.log('info', 'AuthenticationController::constructor');
		User = app.get('models').User;
		Politician = app.get('models').Politician,
		Comment = app.get('models').Comment;
		sequelize = app.get('models').sequelize;
	}


	//assigns the role for a user to a particular event
	//roles are checkedInUser or notCheckedInUser
	AuthorizationController.prototype.isCommentOwner = function (req,res,next) {
		//todo
		if (req.user.id == req.comment.UserId){
			AppLogger.info('User is the creator of the comment');
			next();
		} else {
			//error
			var response = responseUtils.get(401, "UnAuthorized Access", 'Error', false);
			res.send(response);
		}
	}




	return AuthorizationController;

})();

module.exports = authorization_controller;



