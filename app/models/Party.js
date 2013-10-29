
// Then require the installed library in your application code:
var Sequelize = require("sequelize");





module.exports = function (sequelize) {
	var Politician = sequelize.import(__dirname + '/Politician');

	var Party = sequelize.define('Party', {
		name: {
			type:Sequelize.STRING,
//			allowNull: false,
//			validate: {
//				notNull: { args: true, msg: 'name cannot be null' }
//			}
		},
		version: Sequelize.INTEGER,
		imageUrl: Sequelize.TEXT

	})

//	Party.hasMany(Politician, {foreignKeyConstraint:true});

	return Party;

}
