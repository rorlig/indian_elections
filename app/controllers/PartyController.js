/*
 */

var AppLogger = require('../common/AppLogger');


var partyController = (function() {


	function PartyController(){
		AppLogger.info('Enter PartyController constructor');
	}

	//get all the states
	PartyController.prototype.get = function(req, res){
	}


	//get all the constituencies
	PartyController.prototype.getConstituencies = function(req, res){
	}



	//todo check how to validate proper json?
	PartyController.validatePostParams = function(req) {

	};



	return PartyController;

})()

module.exports = partyController;

