// Then require the installed library in your application code:
var Sequelize = require("sequelize");
var Constituency = require("./Constituency");
var State = require("./State");
var Party = require("./Party");

module.exports = function (sequelize) {

//	var Constituency = sequelize.import(__dirname + '/Constituency');

//	var State = sequelize.import(__dirname + '/State');

//	var Party = sequelize.import(__dirname + '/Party');

//	var Award = sequelize.import(__dirname + '/Award');
//
//	var Comment = sequelize.import(__dirname + '/Comment');
//
//	var Rating = 	 sequelize.import(__dirname + '/Rating');
//
//
//	var Favorite = 	 sequelize.import(__dirname + '/Favorite');


	var Politician = sequelize.define('Politician', {
		name: Sequelize.STRING,
		imageName: Sequelize.STRING,
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
