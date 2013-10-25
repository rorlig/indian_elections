// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var Constituency = sequelize.import(__dirname + '/Constituency');

	var State = sequelize.define('State', {
		name: Sequelize.STRING,
		version: Sequelize.INTEGER
	})

//	State.hasMany(Constituency,{foreignKeyConstraint: true});

	return State;

}


