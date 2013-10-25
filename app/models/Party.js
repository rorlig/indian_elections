
// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var Politician = sequelize.import(__dirname + '/Politician');

	var Party = sequelize.define('Party', {
		name: Sequelize.STRING,
		version: Sequelize.INTEGER,
		imageUrl: Sequelize.TEXT

	})

//	Party.hasMany(Politician, {foreignKeyConstraint:true});

	return Party;

}
