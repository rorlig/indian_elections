/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */




var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');



var comment_controller = (function() {

	/**
	 * Comment Controller actions.
	 * @param app
	 */
	function CommentController(app){
		AppLogger.info('Enter CommentController constructor ' + app);
		var models = app.get('models');
		Politician =  models.Politician;
		Party =  models.Party;
		Rating = models.Rating;
		Comment = models.Comment;
		Favorite = models.Favorite;
		sequelize = app.get('models').sequelize;

	}


	//get the comments for a politician  -- move to comment controller...
	CommentController.prototype.get = function (req,res,next) {
		AppLogger.info('CommentController get: ' + req.params.politicianId );


		var limit = req.query.limit!=undefined&&req.query.limit<=20?req.query.limit:20;
		var offset =   req.query.offset!=undefined&&req.query.offset>=0?req.query.offset:0;

		AppLogger.info('limit:  ' + limit +  ' offset: '  + offset);

		Comment.findAll({where: {PoliticianId: req.params.politicianId}, offset: offset, limit: limit}).success(function(comments){
			if (comments == null) comments = [];
			var response = responseUtils.get(200, comments, 'Comment', false);
			AppLogger.info('comments returned:' + JSON.stringify(comments));
			res.send(response);
		}).error(function(error){
				AppLogger.info('Comment not found in db');
				var response = responseUtils.get(666, 'Comment not found:' +JSON.stringify(error), 'Error', true);
				res.send(response);
		})

	}


	//post the comments for a politician  -- move to comment controller...
	CommentController.prototype.post = function (req,res,next) {
		AppLogger.info('CommentController post: ' + req.params.politicianId);

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


//	//post the comments for a politician
//	CommentController.prototype.post = function (req,res,next) {
//	}



	//post the comments for a politician  -- move to comment controller...
	CommentController.prototype.delete = function (req,res,next) {
		AppLogger.info('CommentController get: ' + req.params.politicianId);

	}





	return CommentController;

})();

module.exports = comment_controller;



