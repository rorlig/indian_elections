
// Then require the installed library in your application code:
var Sequelize = require("sequelize");
var Politician = require("./Politician");


//var Award = Sequelize.define('Award', {
//	title: Sequelize.STRING,
//	year: Sequelize.INTEGER
//
//})

module.exports = function (sequelize) {
//	var Politician = sequelize.import(__dirname + '/Politician');

	var Award = sequelize.define('Award', {
		title: Sequelize.STRING,
		year: Sequelize.INTEGER

	})

//	Award.hasOne(Politician);
	return Award;


}

//each award is associated with one politician...?
//Award.hasOne(Politician);
//
//
//module.exports = Award;