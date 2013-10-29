/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');

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
			var response = responseUtils.get(200, result, 'Politician', false);
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
				var response = responseUtils.get(200, politician, 'Politician', false);
				res.send(response);

			}).error(function(error){
				var response = responseUtils.get(666, 'Error in Creating Politician: ' +JSON.stringify(error), 'Error', true);
				AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response);
			})

	}

	//get the  for a politician
	PoliticianController.prototype.getDetails = function (req,res,next) {
		//todo need to populate ratings and comments...
		AppLogger.info('PoliticianController getDetails politicianId:' + req.params.politicianId);
		Politician.find({where: {id: req.params.politicianId}}).success(function(politician){
			if (politician!=null){
				var chainer = new Sequelize.Utils.QueryChainer
				chainer
					.add(politician.getRatings())
					.add(politician.getComments())
					.add(politician.getFavorites())
					.add(politician.getParty())
					.runSerially()
					.success(function(result){
					  AppLogger.info('results ' + JSON.stringify(result[0]));
					  var politicianVal = {};
					      politicianVal.politician = JSON.parse(JSON.stringify(politician));
						  politicianVal.politician.rating = result[0];
					      politicianVal.politician.comment = result[1];
						  politicianVal.politician.favorite = result[2];
						  politicianVal.politician.party = result[3];

//						var returnVal ={};
//						returnVal.rating = result[0];
//						returnVal.comment = result[1];
//						returnVal.favorite = result[2];
//						returnVal.party = result[3]
//						returnVal.politician = politician;
//						returnVal.politician.rating = result[0];
//						returnVal.politician = politician;
//					  politician.rating = [];
//					  politician.rating.push(result[0]);
//					  politician.comment = result[1];
//				      politician.favorite = result[2];
					  var response = responseUtils.get(200, politicianVal, 'Politician', false);
					  AppLogger.info('PoliticianController getDetails politicianId returnVal:' + JSON.stringify(politicianVal));
					  res.send(response);
					})
					.error(function(err){

					})
			  }

//				AppLogger.info('Politician comments: ' + JSON.stringify(politician.getComments()));
//				AppLogger.info('Politician favorites: ' + JSON.stringify(politician.getFavorites()));


			  else {
				var response = responseUtils.get(666, 'Politician not found ', 'Error', true);
//			    AppLogger.log('info', "response returned:" + JSON.stringify(response));
				res.send(response);
			}
		}).error(function(error){
			var response = responseUtils.get(666, 'Politician not found ' +JSON.stringify(error), 'Error', true);
//			AppLogger.log('info', "response returned:" + JSON.stringify(response));
			res.send(response);
		})



	}

	//rate a  politician
	PoliticianController.prototype.rate = function (req,res,next) {

		//create rating element...

		AppLogger.info('PoliticianController:rate');

		Politician.find({where: {id: req.params.politicianId}}).success(function(politician){

			if (req.body.ratingValue === undefined || req.body.ratingValue==""){
				var response = responseUtils.get(666, "Rating Value missing in the Request Body", 'Error', false);
				res.send(response);
			} else {
			   Rating.create({ratingValue:req.body.ratingValue}).success(function(rating){
//				   politician.setRating(rating);
//				   req.user.setRating(rating);
				   rating.setPolitician(politician);
				   rating.setUser(req.user);
//				   req.user.setPolitician(politician);
				   rating.save();
			   })
			   var response = responseUtils.get(200, politician, 'Politician', false);
			   AppLogger.info('PoliticianController getDetails politicianId:' + JSON.stringify(politician));
			   res.send(response);
			}

		}).error(function(error){
				var response = responseUtils.get(666, 'Politician not found' +JSON.stringify(error), 'Error', true);
				res.send(response);
		})


		//todo updating a rating?
//		res.send('TODO - PoliticianController:rate');


	}


	//favorite a  politician
	PoliticianController.prototype.favorite = function (req,res,next) {
		AppLogger.info('PoliticianController:favorite: ' + req.params.politicianId);
		//create rating element...


		Politician.find({where: {id: req.params.politicianId}}).success(function(politician){

			if (req.body.favoriteValue === undefined || req.body.favoriteValue==""){
				var response = responseUtils.get(666, "Rating Value missing in the Request Body", 'Error', false);
				res.send(response);
			} else {
				Favorite.create({favoriteValue:req.body.favoriteValue}).success(function(favorite){
//				   politician.setRating(rating);
//				   req.user.setRating(rating);
					favorite.setPolitician(politician);
					favorite.setUser(req.user);
//				   req.user.setPolitician(politician);
					favorite.save();
				})
				var response = responseUtils.get(200, politician, 'Politician', false);
				AppLogger.info('PoliticianController getDetails politicianId:' + JSON.stringify(politician));
				res.send(response);
			}

		}).error(function(error){
				AppLogger.info('Politician not found in db');
				var response = responseUtils.get(666, 'Politician not found:' +JSON.stringify(error), 'Error', true);
				res.send(response);
		})
//		res.send('TODO - PoliticianController:favorite');


	}

	//post the comments for a politician
	PoliticianController.prototype.comment = function (req,res,next) {
		AppLogger.info('PoliticianController:comment: ' + req.params.politicianId);

		Politician.find({where: {id: req.params.politicianId}}).success(function(politician){

			if (req.body.commentText === undefined || req.body.commentText==""){
				var response = responseUtils.get(666, "Comment Text missing in the Request Body", 'Error', false);
				res.send(response);
			} else {
				Comment.create({commentText:req.body.commentText}).success(function(comment){
//				   politician.setRating(rating);
//				   req.user.setRating(rating);
					comment.setPolitician(politician);
					comment.setUser(req.user);
//				   req.user.setPolitician(politician);
					comment.save();
				})
				var response = responseUtils.get(200, politician, 'Politician', false);
				AppLogger.info('PoliticianController created new comment politicianId:' + JSON.stringify(politician));
				res.send(response);
			}

		}).error(function(error){
				AppLogger.info('Politician not found in db');
				var response = responseUtils.get(666, 'Politician not found:' +JSON.stringify(error), 'Error', true);
				res.send(response);
			})

	}







	return PoliticianController;

})();

module.exports = politician_controller;



