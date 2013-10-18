/*
 *  User Controller class...
 *  Allows adding users , accounts, relogin...
 */


var AppLogger = require('../common/AppLogger');

var userController = (function() {


	function UserController(){
		AppLogger.info('Enter UserController constructor');
	}

	UserController.prototype.get = function(req, res){
		AppLogger.info('UserController:get');

	}

	//todo use promise.js instead of this structure - the callbacks are messy...
	UserController.prototype.post = function(req, res){
		AppLogger.info('UserController:post');

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

