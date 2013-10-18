
var Sequelize = require("sequelize");


module.exports = function (sequelize) {

//	var Politician = sequelize.import(__dirname + '/Politician');

//	var User = sequelize.import(__dirname + '/User');


	var Comment = sequelize.define('Comment',{
		commentText: Sequelize.TEXT
	})

//	Comment.hasOne(User);
//	Comment.hasOne(Politician);
	return Comment;

}