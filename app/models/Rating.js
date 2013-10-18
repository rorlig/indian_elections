
// Then require the installed library in your application code:
//var Sequelize = require("../common/DBHelper");
var Politician = require("./Politician")
var User = require("./User")


module.exports = function (sequelize) {
	var Politician = sequelize.import(__dirname + '/Politician');
	var User = 	 sequelize.import(__dirname + '/User');

	var Rating = sequelize.define('Rating', {

	})

	User.hasMany(Politician, { joinTableModel: Rating })
	Politician.hasMany(User, { joinTableModel: Rating })

	return Rating;
}







//module.exports = Rating;