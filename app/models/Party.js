
// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var Party = sequelize.define('Party', {
		name: Sequelize.STRING,
		version: Sequelize.INTEGER,
		imageUrl: Sequelize.TEXT

	})

	return Party;

}
