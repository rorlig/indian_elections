/**
 *  Politician test cases...
 * /



 /*
 * User Test Cases...
 */

var should = require('should');
var request = require('supertest');
var assert = require('assert');

var ratingBadFormat =  {

}

var rating =  {
	ratingValue: 5
}

var ratingLow =  {
	ratingValue: 1
}

var rating2 =  {
	ratingValue: 2
}



var favoriteBadFormat = {

}

var favorite = {
	favoriteValue: "Yes"
}



//todo some tests are failing ?

describe('Testing GET /api/v1/politician', function(){
	var url = 'http://localhost:3001';

	var testPolitician = {
		name: "Mamata Banerjee",
		imageName:"Mamata_banerjee.jpg",
		almaMater:"Jogesh Chandra Chaudhuri Law College",
		highestDegree:"Law degree",
		dateOfBirth:"11/7/60",
		link:"http://parliamentofindia.nic.in/ls/lok10/mp52.htm",
		politicalCareerBeginning:"Congress (I) Party, 1970",
		versionNumber: 1,
		ideology:"Populism, Socialism, Secularism"
	}

	it('should return a default of 20 limit and 0 offset', function(done){
		request(url)
			.get('/api/v1/politician')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	it('should return a default of 20 limit and 0 offset', function(done){
		request(url)
			.get('/api/v1/politician?limit=30&offset=1')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	it('should return a default of 0 offset for negative offsets', function(done){
		request(url)
			.get('/api/v1/politician?limit=30&offset=-1')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

})

describe('Testing GET /api/v1/politician/:politicianId', function(){
	var url = 'http://localhost:3001';



	it('should return error if the politician Id does not exists', function(done){
		request(url)
			.get('/api/v1/politician/3')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return politician ratings and comments if politician Id exists', function(done){
		request(url)
			.get('/api/v1/politician/1')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	it('should return politician ratings and comments if politician Id exists', function(done){
		request(url)
			.get('/api/v1/politician/1')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

})

describe('Testing POST /api/v1/politician/:politicianId/rate', function(){
	var url = 'http://localhost:3001';

	it('should return error if the user Id does not exist in DB', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.set('UserId','10')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return error if the user Id is not in header', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return error if the politician Id does not exist in DB', function(done){
		request(url)
			.post('/api/v1/politician/10/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body does not contain ratingValue', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body does not contain ratingValue', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body does not contain ratingValue', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(ratingBadFormat)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return 200 OK', function(done){
		request(url)
			.post('/api/v1/politician/2/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(rating)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	it('should return 200 OK for 2nd rating of politician', function(done){
		request(url)
			.post('/api/v1/politician/2/rate')
			.set('Accept', 'application/json')
			.set('UserId','2')
			.send(rating2)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

	it('should return 200 OK for rating low', function(done){
		request(url)
			.post('/api/v1/politician/1/rate')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(ratingLow)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})

})


describe('Testing POST /api/v1/politician/:politicianId/favorite', function(){
	var url = 'http://localhost:3001';

	it('should return error if the user Id does not exist in DB', function(done){
		request(url)
			.post('/api/v1/politician/1/favorite')
			.set('Accept', 'application/json')
			.set('UserId','10')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return error if the user Id is not in header', function(done){
		request(url)
			.post('/api/v1/politician/1/favorite')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return error if the politician Id does not exist in DB', function(done){
		request(url)
			.post('/api/v1/politician/10/favorite')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body is empty', function(done){
		request(url)
			.post('/api/v1/politician/1/favorite')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body does not contain favoriteValue', function(done){
		request(url)
			.post('/api/v1/politician/1/favorite')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(favoriteBadFormat)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return 200 OK', function(done){
		request(url)
			.post('/api/v1/politician/1/favorite')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(favorite)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})


})




//describe('TEST POST /api/v1/user', function(){
//	var url = 'http://localhost:3001';
//
//	var testUser = {
//		name: "Gaurav Gupta",
//		firstName: "Gaurav",
//		lastName: "Gupta",
//		accessToken:"abcd",
//		accessTokenExpiration:1,
//		networkName:"Facebook",
//		networkId: 100001,
//		email: "guptgaurav@gmail.com"
//	}
//
//	var nameMissingUser = {
//		firstName: "Gaurav",
//		lastName: "Gupta",
//		accessToken:"abcd",
//		accessTokenExpiration:1,
//		networkName:"Facebook",
//		networkId: 100001,
//		email: "guptgaurav@gmail.com"
//	}
//
//	emailMissingUser =  {
//		name: "Gaurav Gupta",
//		firstName: "Gaurav",
//		lastName: "Gupta",
//		accessToken:"abcd",
//		accessTokenExpiration:1,
//		networkName:"Facebook",
//		networkId: 100001
//	}
//
//	emailBadFormat =  {
//		name: "Gaurav Gupta",
//		firstName: "Gaurav",
//		lastName: "Gupta",
//		accessToken:"abcd",
//		accessTokenExpiration:1,
//		networkName:"Facebook",
//		networkId: 100001,
//		email: "xxx"
//
//	}
//	//1. missing body
//	//2. new user
//	//3. missing parameters
//	//4. same user ..
//
//	/* missing body */
//
////	it ('should return error if request body is missing', function(done){
////		request(url)
////			.post('/api/v1/user')
////			.set('Accept', 'application/json')
////			.end(function(err, res) {
////				assert.equal(err, null);
////				var body = res.body;
////				assert.equal(body.responseCode, 666);
////				done();
////			});
////	})
//
//	/* adding same account to the userId */
//
////	it ('should return error if the userId is not in the database', function(done){
////		request(url)
////			.post('/api/v1/user')
////			.set('Accept', 'application/json')
////			.send(testUser)
////			.end(function(err, res) {
////				assert.equal(err, null);
////				var body = res.body;
////				assert.equal(body.responseCode, 200);
////				done();
////			});
////	})
//
//
//	it ('should return error if the name is not in the request body', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.send(nameMissingUser)
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(body.responseCode, 666);
//				done();
//			});
//	})
//
//	it ('should return error if the email is not in the request body', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.send(emailMissingUser)
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(body.responseCode, 666);
//				done();
//			});
//	})
//
//	it ('should return error if the email is badly formatted in the request body', function(done){
//		request(url)
//			.post('/api/v1/user')
//			.set('Accept', 'application/json')
//			.send(emailBadFormat)
//			.end(function(err, res) {
//				assert.equal(err, null);
//				var body = res.body;
//				assert.equal(body.responseCode, 666);
//				done();
//			});
//	})
//
//	//add more tests here...
//	//
//
//
//
////	/* adding same account to the userId */
//
////	it ('should return user object if the account is same as the one previously entered', function(done){
////		request(url)
////			.post('/api/v1/user')
////			.set('Accept', 'application/json')
////			.set('UserId','51e237dded93cc0000000005')
////			.send({"account": {
////				"network": "Facebook",
////				"networkId": 712803022,
////				"accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
////				"accessTokenExpiration": 1371268071822,
////				"firstName": "Gaurav",
////				"lastName":"Gupta"
////			}
////			})
////			.end(function(err, res) {
////				assert.equal(err, null);
////				var body = res.body;
////				assert.equal(res.body._id, '51e237dded93cc0000000005');
////				assert.equal(res.body.account.length, 2);
////				done();
////			});
////	})
//
//
//
//
//})

