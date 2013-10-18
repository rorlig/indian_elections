/*
 *  User Controller class...
 *  Allows adding users , accounts, relogin...
 */

var AppLogger = require('../common/AppLogger');


var stateController = (function() {


	function StateController(){
		AppLogger.info('Enter StateController constructor');
	}

	//get all the states
	StateController.prototype.get = function(req, res){
		AppLogger.info('StateController:post');

	}


	//get all the constituencies
	StateController.prototype.getConstituencies = function(req, res){
		AppLogger.info('StateController:getConstituencies');

	}



	//todo check how to validate proper json?
	StateController.validatePostParams = function(req) {

	};





	return StateController;

})()

module.exports = stateController;

