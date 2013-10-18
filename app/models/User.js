
// Then require the installed library in your application code:
//var Sequelize = require("../common/DBHelper");
var Politician = require("./Politician")

var Sequelize = require("sequelize");

//var User = Sequelize.define('User', {
//	name: Sequelize.STRING,
//	email: Sequelize.TEXT
//
//})


module.exports = function (sequelize) {
	var Politician = sequelize.import(__dirname + '/Politician');
	var Comment = sequelize.import(__dirname + '/Comment');


	var User = sequelize.define('User', {
		name: Sequelize.STRING,
		email: Sequelize.TEXT

	})

	User.hasMany(Politician, {as: 'Favorites'})
	User.hasMany(Comment);

	return User;
}

// OK. Now things get more complicated (not really visible to the user :)).
// First let's define a hasMany association
//User.hasMany(Politician, {as: 'Favorites'})


//module.exports = User;