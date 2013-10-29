/*
 *  State Controller class...
 *  Allows adding users , accounts, relogin...
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');
var testState = {
	name: "West Bengal"
}

var testConstituency = {
	name: 'Bhabanipur'
}

var stateController = (function() {
	 var State, Constituency;


	function StateController(app){
		AppLogger.info('Enter StateController constructor');
		State = app.get('models').State;
		Constituency = app.get('models').Constituency;

		State.create(testState).success(function(state){
		   Constituency.create(testConstituency).success(function(constituency){
			   state.setConstituencies([constituency]).success(function(constituencies){

			   }).error(function(error){

			   });
//			   constituency.setState(state);
		   })
		}).error(function(error){})
	}

	//get all the states
	StateController.prototype.get = function(req, res){
		AppLogger.info('StateController:get');
		State.findAll().success(function(states){
			AppLogger.info( " states: " + JSON.stringify(states));
			var response = responseUtils.get(200, states, 'State', false);
			res.send(response);
		}).error(function(error){
			var response = responseUtils.get(666, JSON.stringify(error), 'Error', false);
			res.send(response);
		})
	}


	//get all the constituencies
	StateController.prototype.getConstituencies = function(req, res){
		AppLogger.info('StateController:getConstituencies with stateId' + req.params.stateId);
		State.find({where:{id:req.params.stateId}, include: [Constituency]}).success(function(state){
			if (state==null){
				var response = responseUtils.get(666, 'Invalid State Request', 'Error', true);
				res.send(response);
			} else {
				var response = responseUtils.get(200, state, 'State', false);
				res.send(response);
				//return the constituencies...

			}
		}).error(function(error){
			var response = responseUtils.get(666, JSON.stringify(error), 'Error', true);
			res.send(response);
		})

	}



	//todo check how to validate proper json?
	StateController.validatePostParams = function(req) {

	};





	return StateController;

})()

module.exports = stateController;

