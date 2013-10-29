/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();


var testParty = {
	name: "Trinamul Party",
	imageUrl:"trinamool_congress.png",
	version: 1
}

var testPolitician = {
	name: "Mamata Banerjee",
	imageName:"Mamata_banerjee.jpg",
	almaMater:"Jogesh Chandra Chaudhuri Law College",
	highestDegree:"Law degree",
	dateOfBirth:"11/7/60",
	link:"http://parliamentofindia.nic.in/ls/lok10/mp52.htm",
	politicalCareerBeginning:"Congress (I) Party, 1970",
	versionNumber: 1,
	ideology:"Populism, Socialism, Secularism"
}


var politician_controller = (function() {
	var Politician;
	var Party;
	var Rating;
	var Comment;
	var Favorite;

	/**
	 * Politician Controller actions.
	 * @param app
	 */
	function PoliticianController(app){
		AppLogger.info('Enter PoliticianController constructor ' + app);
		var models = app.get('models');
		Politician =  models.Politician;
		Party =  models.Party;
		Rating = models.Rating;
		Comment = models.Comment;
		Favorite = models.Favorite;

		/** testing stuff **/
		Politician.create(testPolitician).success(function(politician1){
			Politician.create(testPolitician).success(function(politician2){

				Party.create(testParty).success(function(party){
//					politician1.setParty(party);
//					politician2.setParty(party);

					party.setPoliticians([politician1, politician2]).success(function(politicians){
					   AppLogger.info("party " + JSON.stringify(party));
					   AppLogger.info("politicians " + JSON.stringify(politicians));

					}).error(function(error){
						AppLogger.info("error in politician associations"  + JSON.stringify(error));
					})
				})

			})
		})

	}


	//get the  for a politician
	PoliticianController.prototype.get = function (req,res) {
		AppLogger.info('PoliticianController:get');

		var limit = req.query.limit!=undefined&&req.query.limit<=20?req.query.limit:20;
		var offset =   req.query.offset!=undefined&&req.query.offset>=0?req.query.offset:0;

		AppLogger.info('limit: ' + limit +  ' offset:' + offset);
		Politician.findAll({include: [Party]}).success(function(result){
			AppLogger.info("count: " + result.count + " result: " + JSON.stringify(result));
			var response = responseUtils.get(200, ""+ JSON.stringify(result), 'Politician', false);
			res.send(response);
		}).error(function(error){
			AppLogger.info("error:" + error);
			var response = responseUtils.get(666, "Undefined Error", 'Error', true);
			res.send(response);
		});
//		var response = responseUtils.get(200, "politician", 'User', true);
//		res.send(response);
//		res.send('TODO - PoliticianController:get');

	}

	//test method only -- remove it...
	PoliticianController.prototype.post = function (req, res){
			Politician.findOrCreate(req.body).success(function(politician,created){
				console.log(politician.id);
				console.log(created);
				var response = responseUtils.get(200, JSON.stringify(politician), 'Politician', false);
				res.send(response);

			}).error(function(error){
				var response = responseUtils.get(666, 'Error in Creating Politician' +JSON.stringify(error), 'Error', true);
				AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response);
			})

	}

	//get the  for a politician
	PoliticianController.prototype.getDetails = function (req,res,next) {
		//todo need to populate ratings and comments...
		AppLogger.info('PoliticianController getDetails politicianId:' + req.params.politicianId);
		Politician.find({where: {id: req.params.politicianId}, include: [Party, Rating, Favorite, Comment]}).success(function(politician){
			var response = responseUtils.get(200, JSON.stringify(politician), 'Politician', false);
			AppLogger.info('PoliticianController getDetails politicianId:' + JSON.stringify(politician));
			res.send(response);
		}).error(function(error){
			var response = responseUtils.get(666, 'Politician not found' +JSON.stringify(error), 'Error', true);
//			AppLogger.log('info', "response returned:" + JSON.stringify(response));
			res.send(response);
		})



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



