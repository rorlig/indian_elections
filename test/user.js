
/*
 * User Test Cases...
 */

var should = require('should');
var request = require('supertest');
var assert = require('assert');


//todo some tests are failing ?

describe('Testing GET /api/v1/user', function(){
	var url = 'http://localhost:3001';

	var testUser = {
		name: "Gaurav Gupta",
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		networkId: 100001
	}

	it('should return missing headers error if user information is missing in headers', function(done){

		request(url)
			.get('/api/v1/user')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);

				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				assert.equal(body.responseCode, 401);
				done();
			});
	})

//	it('should return no user found if user is not in db', function(done){
//
//		request(url)
//			.get('/api/v1/user')
//			.set('Accept', 'application/json').
//			set('UserId', '51e06e53d2edd1960700000')
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
//
//				assert.equal(body.responseCode, 401);
//				assert.equal(body.responseValue, "UserId Not Found in the Database");
//				done();
//			});
//	})
//
//	it('should return user object if user is in  db', function(done){
//
//		var userId = '51e237dded93cc0000000005';
//		request(url)
//			.get('/api/v1/user')
//			.set('Accept', 'application/json').
//			set('UserId', userId)
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var user = res.body;
//				assert.equal(user._id, userId);
//				done();
//			});
//	})
})


describe('TEST POST /api/v1/user', function(){
	var url = 'http://localhost:3001';

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

	var nameMissingUser = {
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		networkId: 100001,
		email: "guptgaurav@gmail.com"
	}

	emailMissingUser =  {
		name: "Gaurav Gupta",
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		networkId: 100001
	}

	emailBadFormat =  {
		name: "Gaurav Gupta",
		firstName: "Gaurav",
		lastName: "Gupta",
		accessToken:"abcd",
		accessTokenExpiration:1,
		networkName:"Facebook",
		networkId: 100001,
		email: "xxx"

	}
	//1. missing body
	//2. new user
	//3. missing parameters
	//4. same user ..

	/* missing body */

//	it ('should return error if request body is missing', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(body.responseCode, 666);
//				done();
//			});
//	})

	/* adding same account to the userId */

//	it ('should return error if the userId is not in the database', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.send(testUser)
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(body.responseCode, 200);
//				done();
//			});
//	})


	it ('should return error if the name is not in the request body', function(done){
		request(url)
			.post('/api/v1/user')
			.set('Accept', 'application/json')
			.send(nameMissingUser)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it ('should return error if the email is not in the request body', function(done){
		request(url)
			.post('/api/v1/user')
			.set('Accept', 'application/json')
			.send(emailMissingUser)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it ('should return error if the email is badly formatted in the request body', function(done){
		request(url)
			.post('/api/v1/user')
			.set('Accept', 'application/json')
			.send(emailBadFormat)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it ('should return 200 OK if user in database', function(done){
		request(url)
			.post('/api/v1/user')
			.set('Accept', 'application/json')
			.send(testUser)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	//add more tests here...
	//



//	/* adding same account to the userId */

//	it ('should return user object if the account is same as the one previously entered', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.set('UserId','51e237dded93cc0000000005')
//			.send({"account": {
//				"network": "Facebook",
//				"networkId": 712803022,
//				"accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
//				"accessTokenExpiration": 1371268071822,
//				"firstName": "Gaurav",
//				"lastName":"Gupta"
//			}
//			})
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(res.body._id, '51e237dded93cc0000000005');
//				assert.equal(res.body.account.length, 2);
//				done();
//			});
//	})




})

