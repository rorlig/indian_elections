// Then require the installed library in your application code:
var Sequelize = require("sequelize");
var Constituency = require("./Constituency");
var State = require("./State");
var Party = require("./Party");

module.exports = function (sequelize) {



	var Politician = sequelize.define('Politician', {
		name: {
			type:Sequelize.STRING,
//			allowNull: false,
//			validate: {
//				notNull: { args: true, msg: 'name cannot be null' }
//			}
		},
		imageName: {
			type:Sequelize.STRING,
		},
		versionNumber: Sequelize.INTEGER,
		almaMater: Sequelize.TEXT,
		highestDegree: Sequelize.TEXT,
		dateOfBirth: Sequelize.DATE,
		description: Sequelize.TEXT,
		link: Sequelize.TEXT,
		ideology: Sequelize.TEXT,
		politicalCareerBeginning: Sequelize.TEXT,
		currentPosition: Sequelize.TEXT,
		personalWebsite: Sequelize.TEXT

	})



//	Politician.hasOne(Constituency);
//	Politician.hasOne(State);
//	Politician.hasOne(Party);
//	Politician.hasMany(Award, {foreignKeyConstraint:true});
//	Politician.hasMany(Comment, {foreignKeyConstraint:true} );
//	Politician.hasMany(Rating,{foreignKeyConstraint:true} )
//	Politician.hasMany(Favorite,{foreignKeyConstraint:true} )




	return Politician;

}




//module.exports = Politician;
