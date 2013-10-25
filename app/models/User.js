
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
			allowNull: false,
			validate: {
				notNull: { args: true, msg: 'name cannot be null' }
			}
		},
		email: {
			type:Sequelize.TEXT,
			allowNull: false,
			validate: {
				notNull: { args: true, msg: 'email cannot be null' } ,
				isEmail: {args: true, msg:'email incorrectly formatted'}
			}
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'firstName cannot be null'}
			}
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'lastName cannot be null'}
			}
		},
		accessToken: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'accessToken cannot be null'}
			}
		},
		accessTokenExpiration: {
			type: Sequelize.BIGINT,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'accessTokenExpiration cannot be null'}
			}
		},
		networkName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'networkName cannot be null'}
			}
		},
		networkId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {args:true, msg:'networkId cannot be null'}
			}
		}



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