// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var State = sequelize.define('State', {
		name: Sequelize.STRING,
		version: Sequelize.INTEGER,
		stateId: Sequelize.STRING
	})

	return State;

}


