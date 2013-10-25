
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
//	var Politician = sequelize.import(__dirname + '/Politician');
//	var Comment = sequelize.import(__dirname + '/Comment');
//	var Rating = 	 sequelize.import(__dirname + '/Rating');


	var Favorite = 	 sequelize.import(__dirname + '/Favorite');

	var User = sequelize.define('User', {
		name: {
			type:Sequelize.STRING,
			validate: {
				notNull: { args: true, msg: 'name cannot be null' }
			}
		},
		email: {
			type:Sequelize.TEXT,
			validate: {
				notNull: { args: true, msg: 'email cannot be null' } ,
				isEmail: {args: true, msg:'email incorrectly formatted'}
			}
		},
		firstName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		accessToken: Sequelize.TEXT,
		accessTokenExpiration:Sequelize.BIGINT,
		networkName: Sequelize.STRING,
		networkId: Sequelize.INTEGER




})

//	User.hasMany(Politician, {as: 'Favorites', foreignKeyConstraint:true})
//	User.hasMany(Favorite, {foreignKeyConstraint:true});
//
//
//	User.hasMany(Comment, {foreignKeyConstraint:true});
//	User.hasMany(Rating,{foreignKeyConstraint:true});




	return User;
}

// OK. Now things get more complicated (not really visible to the user :)).
// First let's define a hasMany association
//User.hasMany(Politician, {as: 'Favorites'})


//module.exports = User;