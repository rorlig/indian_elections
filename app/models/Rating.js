
// Then require the installed library in your application code:
var Sequelize = require("Sequelize");
var Politician = require("./Politician")
var User = require("./User")


module.exports = function (sequelize) {
//	var Politician = sequelize.import(__dirname + '/Politician');
//	var User = 	 sequelize.import(__dirname + '/User');

	var Rating = sequelize.define('Rating', {
	   ratingValue: Sequelize.INTEGER
	})

//	User.hasMany(Politician, { joinTableModel: 'Rating' })
//	Politician.hasMany(User, { joinTableModel: 'Rating' })

	return Rating;
}







//module.exports = Rating;