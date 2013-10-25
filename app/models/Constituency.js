
// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
//	var Politician = sequelize.import(__dirname + '/Politician');

	var Constituency = sequelize.define('Constituency', {
		name: Sequelize.STRING

	})
//	Constituency.hasMany(Politician,{as: 'Representative'});
	return Constituency;

}



