/*
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');

var testParty = {
	name: "Samajwadi Party"
}

var testConstituency = {
	name: 'Bhabanipur'
}
var partyController = (function() {

	var Party, Politician;

	function PartyController(app){
		AppLogger.info('Enter PartyController constructor');
		Party = app.get('models').Party;
		Politician = app.get('models').Politician;

	}

	//get all the parties
	PartyController.prototype.get = function(req, res){
		Party.findAll().success(function(parties){
		if (parties!=null){
				AppLogger.info( " parties: " + JSON.stringify(parties));
				var response = responseUtils.get(200, parties, 'Party', false);
				res.send(response);
		  }
		}).error(function(error){
				var response = responseUtils.get(666, error, 'Error', true);
				res.send(response);
		})

	}

	//get all the parties
	PartyController.prototype.getMembers = function(req, res){
		Party.find({where: {id:req.params.partyId}, include:[Politician]}).success(function(party){
			if (party!=null){
				AppLogger.info( " parties: " + JSON.stringify(party));
				var response = responseUtils.get(200, party, 'Party', false);
				res.send(response);
			}
		}).error(function(error){
				var response = responseUtils.get(666, error, 'Error', true);
				res.send(response);
			})

	}


	//get all the constituencies
//	PartyController.prototype.getConstituencies = function(req, res){
//		res.send('TODO - PartyController:getConstituencies');
//
//	}



//	//todo check how to validate proper json?
//	PartyController.validatePostParams = function(req) {
//
//	};



	return PartyController;

})()

module.exports = partyController;

