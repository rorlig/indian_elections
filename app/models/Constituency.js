
// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var Constituency = sequelize.define('Constituency', {
		name: Sequelize.STRING,
		stateId: Sequelize.STRING

	})
	return Constituency;

}



