
// Then require the installed library in your application code:
//var Sequelize = require("../common/DBHelper");
//var Politician = require("./Politician")
//var User = require("./User")
var Sequelize = require("sequelize");


module.exports = function (sequelize) {
//	var Politician = sequelize.import(__dirname + '/Politician');
//	var User = 	 sequelize.import(__dirname + '/User');

	var Favorite = sequelize.define('Favorite', {
		favoriteValue: Sequelize.STRING
	})

//	User.hasMany(Politician, { joinTableModel: 'Rating' })
//	Politician.hasMany(User, { joinTableModel: 'Rating' })

	return Favorite;
}







//module.exports = Rating;