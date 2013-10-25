
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var swagger_models = require('./app/meta/swagger-models');

var petResources = require("./app/meta/petResources.js");



//define the environment ...
var env = process.env.NODE_ENV || 'development'
//logger
var AppLogger = require('./app/common/AppLogger');

//config
var config = require('./config/config')[env]

// Then require the installed library in your application code:
//var Sequelize = require("sequelize")

AppLogger.log('info', 'Connecting to the sqlite db');


//create the db with the proper dbOptions...
//var sequelize = new Sequelize('indian_elections_2014', config.username, config.password, config.dbOptions);


AppLogger.log('info', 'Reading models ');
var app = express();

app.set('models', require('./app/models'), function(){
//	var UserController =  require('./app/controllers/UserController');
//
//	var userController =  new UserController(app);
//
//	var testUser = {
//		name: "Gaurav Gupta",
//		firstName: "Gaurav",
//		lastName: "Gupta",
//		accessToken:"abcd",
//		accessTokenExpiration:1,
//		networkName:"Facebook",
//		email: "Email"
//	}
//
//	userController.addUserToDB(testUser);

});
var sequelize = app.get('models').sequelize;
//models.forEach(function(model){
//	fs.readFileSync(__dirname + '/app/models/' + model + '.js').fun
//})
////// Bootstrap models
//fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
//	AppLogger.log('info', "fileName is "  + file);
//	if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file)(sequelize)
//})



AppLogger.log('info', 'Syncing the database');

//todo - turn this to false after first execution...
//sequelize.sync({force:true}); // will emit success or failure    ....

AppLogger.log('info', 'Registering the routes');






//var swagger = require("swagger-node-express");
//
//swagger.setAppHandler(app);
//
//swagger.addModels(swagger_models)
//	.addGet(petResources.findByTags)
//	.addGet(petResources.findByStatus)
//	.addGet(petResources.findById)
//	.addPost(petResources.addPet)
//	.addPut(petResources.updatePet)
//	.addDelete(petResources.deletePet);
//
//// Configures the app's base path and api version.
//swagger.configure("http://localhost:3001/", "0.1");



// all environments
app.set('port', process.env.PORT || 3001);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

//app.configure(function(){
////	app.use(express.favicon());
////	app.use(express.logger('dev'));
////	app.use(require('connect').bodyParser());
//	app.use(express.bodyParser());
////	app.use(express.methodOverride());
//	app.use(app.router);
//	require('./config/routes')(app, sequelize)
//});

//app.use(express.static(path.join(__dirname, 'public')));

//// Serve up swagger ui at /docs via static route
//var docs_handler = express.static(path.join('./node_modules/swagger-node-express/swagger-ui-1.1.13/'));
//app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
//	AppLogger.info('GET /docs');
//	if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
//		AppLogger.info('Second Stuff');
//		res.writeHead(302, { 'Location' : req.url + '/' });
//		res.end();
//		return;
//	}
//	// take off leading /docs so that connect locates file correctly
//	req.url = req.url.substr('/docs'.length);
//	AppLogger.info('Stripped url:::' + req.url);
//	return docs_handler(req, res, next);
//});

// Bootstrap routes


//// Bootstrap application settings
require('./config/express')(app, config)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./config/routes')(app, sequelize)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
