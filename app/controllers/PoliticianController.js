/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */


var AppLogger = require('../common/AppLogger');





var politician_controller = (function() {

	/**
	 * Politician Controller actions.
	 * @param app
	 */
	function PoliticianController(){
		AppLogger.info('Enter PoliticianController constructor');


	}


	//get the  for a politician
	PoliticianController.prototype.get = function (req,res,next) {
		AppLogger.info('PoliticianController:get');
		res.send('TODO - PoliticianController:get');

	}

	//get the  for a politician
	PoliticianController.prototype.getDetails = function (req,res,next) {
		AppLogger.info('PoliticianController:getDetails');
		res.send('TODO - PoliticianController:getDetails');


	}

	//rate a  politician
	PoliticianController.prototype.rate = function (req,res,next) {
		AppLogger.info('PoliticianController:rate');
		res.send('TODO - PoliticianController:rate');


	}


	//favorite a  politician
	PoliticianController.prototype.favorite = function (req,res,next) {
		AppLogger.info('PoliticianController:favorite');
		res.send('TODO - PoliticianController:favorite');


	}

	//post the comments for a politician
	PoliticianController.prototype.comment = function (req,res,next) {
		AppLogger.info('PoliticianController:comment');
		res.send('TODO - PoliticianController:comment');
	}







	return PoliticianController;

})();

module.exports = politician_controller;



