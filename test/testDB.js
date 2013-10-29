var should = require('should');
var request = require('supertest');
var assert = require('assert');


var Sequelize = require("sequelize")
var config = require("../config/config");

console.log('info', 'Connecting to the sqlite db');

var express = require('express');



//create the db with the proper dbOptions...
var sequelize = new Sequelize('indian_elections_2014', config.username, config.password, config.dbOptions);


describe('Adding One User manually to the DB /api/v1/user', function(){
	var url = 'http://localhost:3001';

	var app = express();
	app.set('models', require('../app/models'));

	var UserController =  require('../app/controllers/UserController');
	var userController =  new UserController(app);

	var testUser = {
		name: "Gaurav Gupta",
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		networkId: 100001,
		email: "guptgaurav@gmail.com"
	}
	console.log('info', 'Adding to the sqlite db');

	userController.addUserToDB(testUser);
  }
);