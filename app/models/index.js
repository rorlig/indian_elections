// Bootstrap models
//fs.report

//config
//define the environment ...
var env = process.env.NODE_ENV || 'development';

var config = require('../../config/config')[env] ;

// Then require the installed library in your application code:
var Sequelize = require('sequelize-mysql').sequelize
//AppLogger.log('info', 'Connecting to the sqlite db');


//create the db with the proper dbOptions...
var sequelize = new Sequelize(config.username,config.username, config.password, config.dbOptions);
// load models

var models = [
	'User',
	'State',
	'Party',
	'Politician',
	'Constituency',
	'Award',
	'Comment',
	'Favorite',
	'Rating'


];

models.forEach(function(model) {
	//need to drop things to make sure the order is maintained while droping tables...
	module.exports[model] = sequelize.import(__dirname + '/' + model);
});


models.reverse().forEach(function(model) {

	sequelize.import(__dirname + '/' + model).drop().success(function(){
		console.log("success model:" + model);

	}).error(function(error){
			console.log("model:" + model + " error:" + error);
		});
});



(function(m) {
	m.Award.belongsTo(m.Politician, {foreignKey: 'award_politician_id',
								     as: 'politician_id',foreignKeyConstraint:true});
	m.Politician.hasMany(m.Award, {foreignKey: 'award_politician_id',foreignKeyConstraint:true});


	m.Comment.belongsTo(m.User, {
//								 foreignKey: 'comment_user_id',
//								 as: 'user_id',
								foreignKeyConstraint:true});
	m.Comment.belongsTo(m.Politician, {
//								foreignKey: 'comment_politician_id',
								foreignKeyConstraint:true
						});
	m.Politician.hasMany(m.Comment,
						{
//							foreignKey: 'comment_politician_id',
							foreignKeyConstraint:true
						});
	m.User.hasMany(m.Comment, {
//								foreignKey: 'comment_user_id',
								foreignKeyConstraint:true
							  }
					);

	m.Favorite.belongsTo(m.User, {
//								  foreignKey: 'favorite_user_id',
//								  as: 'user_id',
								  foreignKeyConstraint:true
						});
	m.Favorite.belongsTo(m.Politician, {
//										foreignKey: 'favorite_politician_id',
//									    as: 'politician_id',
										foreignKeyConstraint:true});
	m.Politician.hasMany(m.Favorite,{
//									foreignKey: 'favorite_politician_id',
									foreignKeyConstraint:true
							});
	m.User.hasMany(m.Favorite, {
//								foreignKey: 'favorite_user_id',
								foreignKeyConstraint:true
					});

	m.Rating.belongsTo(m.User, {
//								foreignKey: 'rating_user_id',
//								as: 'user_id',
								foreignKeyConstraint:true});
	m.Rating.belongsTo(m.Politician, {
//									  foreignKey: 'rating_politician_id',
//									  as: 'user_id',
									  foreignKeyConstraint:true
									});
	m.Politician.hasMany(m.Rating, {
//									foreignKey: 'rating_politician_id',
									foreignKeyConstraint:true
								});
	m.User.hasMany(m.Rating, {
//			foreignKey: 'rating_user_id',
			foreignKeyConstraint:true
		}
	);


	m.Constituency.belongsTo(m.State, {foreignKey: 'constituency_state_id',
									   as: 'state_id',foreignKeyConstraint:true});
	m.State.hasMany(m.Constituency,{foreignKey: 'constituency_state_id', foreignKeyConstraint:true});

	m.Politician.belongsTo(m.Party, {
//		foreignKey: 'politician_party_id',
//									  as: 'party_id',
									  foreignKeyConstraint:true
	});
	m.Party.hasMany(m.Politician
//		, {foreignKey: 'politician_party_id', foreignKeyConstraint:true}
	);
//	m.User.drop();
//
	//re-export...
//	m.forEach(function(model) {
//		module.exports[model] = sequelize.import(__dirname + '/' + model);
//	});
//	sequelize.sync();


})(module.exports);




//sequelize.sync();
//(function(m) {
//	m.Award.belongsTo(m.Politician, {foreignKey: 'award_politician_id',
//		as: 'politician_id'});
//	m.Politician.hasMany(m.Award, {foreignKey: 'award_politician_id'});
//
//
//	m.Comment.belongsTo(m.User, {foreignKey: 'comment_user_id',
//		as: 'user_id'});
//	m.Comment.belongsTo(m.Politician, {foreignKey: 'comment_politician_id'});
//	m.Politician.hasMany(m.Comment, {foreignKey: 'comment_politician_id'
//		});
//	m.User.hasMany(m.Comment, {foreignKey: 'comment_user_id'});
//
//	m.Favorite.belongsTo(m.User, {foreignKey: 'favorite_user_id',
//		as: 'user_id'});
//	m.Favorite.belongsTo(m.Politician, {foreignKey: 'favorite_politician_id',
//		as: 'politician_id'});
//	m.Politician.hasMany(m.Favorite,{foreignKey: 'favorite_politician_id'});
//	m.User.hasMany(m.Favorite, {foreignKey: 'favorite_user_id'});
//
//	m.Rating.belongsTo(m.User, {foreignKey: 'rating_user_id',
//		as: 'user_id'});
//	m.Rating.belongsTo(m.Politician, {foreignKey: 'rating_politician_id',
//		as: 'user_id'});
//	m.Politician.hasMany(m.Rating, {foreignKey: 'rating_politician_id'}
//	);
//	m.User.hasMany(m.Rating, {foreignKey: 'rating_user_id'}
//	);
//
//
//	m.Constituency.belongsTo(m.State, {foreignKey: 'constituency_state_id',
//		as: 'state_id'});
//	m.State.hasMany(m.Constituency,{foreignKey: 'constituency_state_id'});
//
//	m.Politician.belongsTo(m.Party, { foreignKey: 'politician_party_id',
//		as: 'party_id'});
//	m.Party.hasMany(m.Politician, {foreignKey: 'politician_party_id'});
////	m.User.drop();
////
////	sequelize.sync();
//
//
//})(module.exports);

//sequelize.drop().success(function(){
//	console.log('drop successful');
//	sequelize.sync();
//}).error(function(error){
//	console.log('drop unsuccesful' + error);
//});
////drop...






module.exports.sequelize = sequelize;