/**
 * Politician controller class
 * Checks if the user is authorized to see the content...
 */


var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');


var async = require('async');

var testParty = {
	name: "Trinamul Party",
	imageUrl:"trinamool_congress.png",
	version: 1
}

var testParty2 = {
	name: "Samajwadi Party",
	imageUrl:"samajwadi_party.png",
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

var testPolitician2 = {
	name: "Akhilesh Yadav",
	imageName:"akhilesh_yadav.jpg",
	almaMater:"University of Sydney",
	highestDegree:"Master's degree environmental engineering",
	dateOfBirth:"1/7/73",
	link:"http://www.parliamentofindia.nic.in/ls/lok13/biodata/13UP67.htm",
	politicalCareerBeginning:"Samajwadi Party,2000",
	versionNumber: 1,
	ideology:"Populism, Democratic socialism, Secularism, Social conservatism"
}


var politician_controller = (function() {
	var Politician;
	var Party;
	var Rating;
	var Comment;
	var Favorite;
	var sequelize;


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
		sequelize = app.get('models').sequelize;


		/** testing stuff **/
		Politician.create(testPolitician).success(function(politician1){
//			Politician.create(testPolitician).success(function(politician2){

				Party.create(testParty).success(function(party){
//					politician1.setParty(party);
//					politician2.setParty(party);

					party.setPoliticians([politician1]).success(function(politicians){
					   AppLogger.info("party " + JSON.stringify(party));
					   AppLogger.info("politicians " + JSON.stringify(politicians));

					}).error(function(error){
						AppLogger.info("error in politician associations"  + JSON.stringify(error));
					})
				})

//			})
		})

		/** 2nd politician testing stuff **/
		Politician.create(testPolitician2).success(function(politician1){

				Party.create(testParty2).success(function(party){
//					politician1.setParty(party);
//					politician2.setParty(party);

					party.setPoliticians([politician1]).success(function(politicians){
						AppLogger.info("party " + JSON.stringify(party));
						AppLogger.info("politicians " + JSON.stringify(politicians));

					}).error(function(error){
							AppLogger.info("error in politician associations"  + JSON.stringify(error));
						})
				})

		})

	}


	//get the  for a politician
	PoliticianController.prototype.get = function (req,res) {
		AppLogger.info('PoliticianController:get');

		var limit = req.query.limit!=undefined&&req.query.limit<=20?req.query.limit:20;
		var offset =   req.query.offset!=undefined&&req.query.offset>=0?req.query.offset:0;

		//if orderBy is not present
		var orderBy = req.query.orderBy!=undefined||req.query.orderBy==""?req.query.orderBy:"name"


	    //todo fix this - refactor it ... very ugly..
		var ratingRawSql = "SELECT Politicians.*, Parties.id, Ratings.*, avg (Ratings.ratingValue) as averageRating from Politicians,Parties, Ratings where Politicians.id = Ratings.PoliticianId and Politicians.PartyId = Parties.id group by Politicians.id order by  averageRating desc";

		AppLogger.info('limit: ' + limit +  ' offset:' + offset + ' orderBy: ' + orderBy);
		if (orderBy =="rating"){
			AppLogger.info("orderBy:rating");
			sequelize.query(ratingRawSql,  null, {raw: true}).success(function(politicians){
				AppLogger.info("politicians" + JSON.stringify(politicians));
				var resultsJSON = [];
				var numRunningQueries = 0;
				async.forEach(politicians, function(politician){
					numRunningQueries++;
					Party.find({where: {id: politician.PartyId}}).success(function(party){
						var politicianJSON = JSON.parse(JSON.stringify(politician));


						politician.party = party;
							politicianJSON.party = party;
							resultsJSON.push(politicianJSON);

							numRunningQueries--;
							if (numRunningQueries==0){
								var response = responseUtils.get(200, resultsJSON, 'Politician', false);
								res.send(response);
							}
						})
				.error(function(error){
					AppLogger.info("error:" + error);
					var response = responseUtils.get(666, "Undefined Error", 'Error', true);
					res.send(response);
				});
			})
			})
		}  else   {
//		if (orderBy == "name")
			AppLogger.info("orderBy:name");
			var chainer = new Sequelize.Utils.QueryChainer;

//			chainer.add(Politician.findAll({include: [Rating], order: "name" }).run().
//				.add()
			Politician.findAll({include: [Rating], order: "name" }).success(function(politicians){
				var resultsJSON = [];
				var numRunningQueries = 0;
				async.forEach(politicians, function(politician){
					numRunningQueries++;
					Party.find({where: {id: politician.PartyId}}).success(function(party){
						AppLogger.info(" party: " + JSON.stringify(party));
						var politicianJSON = JSON.parse(JSON.stringify(politician));
//						AppLogger.info(" politician at  " + i + " is " + JSON.stringify(politician));
						resultsJSON.push(politicianJSON);
						politician.party = party;
						politicianJSON.party = party;
						numRunningQueries--;
						if (numRunningQueries==0){
							var response = responseUtils.get(200, resultsJSON, 'Politician', false);
							res.send(response);
							}
						})
					} )

//					return politicians;
			})
////				.then(function(politicians){
////					AppLogger.info(" politicians: " + JSON.stringify(politicians) + " ");
////
////					var resultsJSON = [];
////					var numRunningQueries = 0
////
////					for (var i=0; i< politicians.length; i++) {
////					numRunningQueries++;
////					var politician = politicians[i];
////				    var politicianJSON = JSON.parse(JSON.stringify(politician));
////					AppLogger.info(" politician at  " + i + " is " + JSON.stringify(politician));
////
////
////
////					Party.find({where: {id: politician.PartyId}}).success(function(party){
////							AppLogger.info(" party: " + JSON.stringify(party));
////	//						politician.party = party;
////						politicianJSON.party = party;
////						AppLogger.info(" politician: " + JSON.stringify(politician));
////						AppLogger.info(" politicianJSON: " + JSON.stringify(politicianJSON));
////						numRunningQueries--;
////						resultsJSON.push(politicianJSON);
//////						politicianJSON = null;
////						if (numRunningQueries==0)   {
////							var response = responseUtils.get(200, resultsJSON, 'Politician', false);
////							res.send(response);
////							AppLogger.info(" resultsJSON: " + JSON.stringify(resultsJSON));
////
////						}
////
////					})
////				}
//
//
////				return resultsJSON;
//
//			  }
//			)
//			.then(function(politicianJSON){
////				AppLogger.info(" size : "  + politicianJSON.length + "  now politicians: " + JSON.stringify(politicianJSON) );
//				var response = responseUtils.get(200, politicianJSON, 'Politician', false);
//				res.send(response);
//			})
//			Politician.findAll({include: [Rating], order: "name" }).success(function(results){
//				resultsJSON = JSON.parse(JSON.stringify(results));
//				for (var i=0; i< results.length; i++) {
//					var result = results[i];
//					var resultJSON = resultsJSON[i];
//					Party.find({where: {id: result.PartyId}}).success(function(party){
//						AppLogger.info("count: " + result.count + " party: " + JSON.stringify(party));
//						result.party = party;
//						resultJSON.party = party;
//						AppLogger.info(" result: " + JSON.stringify(result));
//						AppLogger.info(" result: " + JSON.stringify(resultJSON));
//					})
//				}
//				AppLogger.info("count: " + results.count + " result: " + JSON.stringify(results));
//				AppLogger.info("count: " + resultsJSON.party + " result: " + JSON.stringify(resultsJSON));
//
//				var response = responseUtils.get(200, resultsJSON, 'Politician', false);
//				res.send(response);
//
//
//			}).error(function(error){
//				AppLogger.info("error:" + error);
//				var response = responseUtils.get(666, "Undefined Error", 'Error', true);
//				res.send(response);
//			});
		}
//		else
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


	//checks if the pollId exists...
	PoliticianController.prototype.checkPoliticianId = function(req, res, next){

		var politicianId = req.params.politicianId;
		AppLogger.info('PoliticianController:checkPoliticianId: ' + politicianId);

		if (politicianId === undefined || politicianId ==""){
			var response = responseUtils.get(666, "politicianId missing in the req params", 'Error', false);
			res.send(response);
		}  else {
			Politician.find({where: {id:politicianId}}).success(function(politician){
			   if (politician == null){
				   var response = responseUtils.get(666, "Politician not found", 'Error', false);
				   res.send(response);
			   }  else {
				   next();
			   }
			}).error(function(error){
				var response = responseUtils.get(666, "Politician not found", 'Error', false);
				res.send(response);
			})
		}

	}






	return PoliticianController;

})();

module.exports = politician_controller;



