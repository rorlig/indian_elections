/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */




var AppLogger = require('../common/AppLogger');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var Sequelize = require('sequelize');
var moment = require('moment');



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


	//get the comments for a politician
	CommentController.prototype.get = function (req,res,next) {
		AppLogger.info('CommentController get: ' + req.params.politicianId);

		var dateNow =  moment().format('YYYY-MM-DD HH:mm:ss');

		AppLogger.info("dateNow: " + dateNow + " now: " + moment.utc().format('YYYY-MM-DD HH:mm:ss'));

		var since;
		if (req.query.since!=undefined){
			since = new moment(parseInt(req.query.since,10)).utc().format('YYYY-MM-DD HH:mm:ss');

		} else {
			since = new moment(0);
		}

		AppLogger.info('since  ' + since);


		var limit = req.query.limit!=undefined&&req.query.limit<=20?req.query.limit:20;
		var offset =   req.query.offset!=undefined&&req.query.offset>=0?req.query.offset:0;
//		var since = req.query.since!=undefined&&req.query.since<dateNow?req.query.since:-1;

		AppLogger.info('limit:  ' + limit +  ' offset: '  + offset+ "since:" + since);

		Comment.findAll({where: {PoliticianId: req.params.politicianId, updatedAt:{gt:since}}, offset: offset, limit: limit}).success(function(comments){
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


	//post the comments for a politician
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
					var response = responseUtils.get(200, comment, 'Commnet', false);
					AppLogger.info('CommentController created new comment politicianId:' + JSON.stringify(politician));
					res.send(response);
				})

			}

		}).error(function(error){
				AppLogger.info('Politician not found in db');
				var response = responseUtils.get(666, 'Politician not found:' +JSON.stringify(error), 'Error', true);
				res.send(response);
		})

	}

	//delete the comments for a politician
	CommentController.prototype.delete = function (req,res,next) {
		AppLogger.info('CommentController delete comment for poll : ' + req.params.politicianId + ' with commentId:' + req.params.commentId);
		AppLogger.info("comment is :" + JSON.stringify(req.comment));

		var comment  = req.comment;
//		Comment.find(comment.id).success(function(comment){
	        comment.destroy().success(function(u){
		        AppLogger.info('Deleted comment ' + comment.id + ' successfully');
		        var response = responseUtils.get(200, 'Comment Deleted', 'Comment', false);
		        res.send(response);
	        }).error(function(error){
		        var response = responseUtils.get(666, 'Comment not deleted successfully:' + JSON.stringify(error), 'Error', true);
		        res.send(response);
			})

//		}).error(function(){
//		   AppLogger.info('Error deleting comment ');
//			var response = responseUtils.get(666, 'Comment not found:' + JSON.stringify(error), 'Error', true);
//			res.send(response);
//
//
//		});

//		res.send('TODO');
	}

	//post the comments for a politician
	CommentController.prototype.put = function (req,res,next) {
		var comment = req.comment;
		AppLogger.info('CommentController put: ' + req.params.politicianId);
		if (req.body.commentText === undefined || req.body.commentText==""){
			var response = responseUtils.get(666, "Comment Text missing in the Request Body", 'Error', false);
			res.send(response);
		}

//		Comment.find(comment.id).success(function(comment){
			comment.updateAttributes({commentText: req.body.commentText})
				.success(function(u){
				AppLogger.info('updated comment ' + comment.id + ' successfully');
				var response = responseUtils.get(200, 'Comment Updated', 'Comment', false);
				res.send(response);
			}).error(function(error){
					var response = responseUtils.get(666, 'Comment not updated successfully:' + JSON.stringify(error), 'Error', true);
					res.send(response);
				})

//		}).error(function(){
//				AppLogger.info('Error deleting comment ');
//				var response = responseUtils.get(666, 'Comment not found:' + JSON.stringify(error), 'Error', true);
//				res.send(response);
//
//
//		});

	}





	//checks if the pollId exists...
	CommentController.prototype.checkCommentId = function(req, res, next){

		var commentId = req.params.commentId;
		AppLogger.info('CommentController:commentId: ' + commentId);

		if (commentId === undefined || commentId ==""){
			var response = responseUtils.get(666, "commentId missing in the req params", 'Error', false);
			res.send(response);
		}  else {
			Comment.find({where: {id:commentId}}).success(function(comment){
				if (comment == null){
					var response = responseUtils.get(666, "Comment not found", 'Error', false);
					res.send(response);
				}  else {
					req.comment = comment;
					next();
				}
			}).error(function(error){
					var response = responseUtils.get(666, "Comment not found", 'Error', false);
					res.send(response);
				})
		}
	}






	return CommentController;

})();

module.exports = comment_controller;



