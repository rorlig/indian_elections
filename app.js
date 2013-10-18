
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs')


//define the environment ...
var env = process.env.NODE_ENV || 'development'
//logger
var AppLogger = require('./app/common/AppLogger');

//config
var config = require('./config/config')[env]

// Then require the installed library in your application code:
var Sequelize = require("sequelize")

AppLogger.log('info', 'Connecting to the sqlite db');


//create the db with the proper dbOptions...
var sequelize = new Sequelize('indian_elections_2014', config.username, config.password, config.dbOptions);


AppLogger.log('info', 'Reading models ');

// Bootstrap models
//fs.report

//// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
	AppLogger.log('info', "fileName is "  + file);
	if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file)(sequelize)
})



AppLogger.log('info', 'Syncing the database');

//todo - turn this to false after first execution...
sequelize.sync({force:true}); // will emit success or failure    ....

AppLogger.log('info', 'Registering the routes');




var app = express();


// Bootstrap routes
require('./config/routes')(app)

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
