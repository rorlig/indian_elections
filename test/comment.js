/**
 *  Comment Test Cases...
 * /

 // 1. test blank comments?
 // 2. test pagination of comments...
 // 3. test non existent politician
 // 4. test unauthorized comment posting
 // 5. test unauthorzied or unauthenticated comment deletion...
 //

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

var commentBadFormat = {

}

var comment = {
	commentText: "This is a test comment"
}


var commentNewText = {
	commentText: "This an updated test comment"
}

//todo some tests are failing ?








describe('Testing POST /api/v1/politician/:politicianId/comment', function(){
	var url = 'http://localhost:3001';

	it('should return error if the user Id does not exist in DB', function(done){
		request(url)
			.post('/api/v1/politician/1/comment')
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
			.post('/api/v1/politician/1/comment')
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
			.post('/api/v1/politician/10/comment')
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
			.post('/api/v1/politician/1/comment')
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

	it('should return error if the body does not contain commentText', function(done){
		request(url)
			.post('/api/v1/politician/1/comment')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(commentBadFormat)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return 200 OK if commentText , userId and politicianId exist', function(done){
		request(url)
			.post('/api/v1/politician/1/comment')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(comment)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 200);
				done();
			});
	})


	it('should add 30 comments to the politician wall', function(done){

		for (var i=0; i<30; ++i ) {
			request(url)
				.post('/api/v1/politician/1/comment')
				.set('Accept', 'application/json')
				.set('UserId','1')
				.send(comment)
				.end(function(err, res) {
					assert.equal(err, null);
					var body = res.body;
//					console.log("res body: " + JSON.stringify(body));
					//check everything works...
					assert.equal(body.responseCode, 200);
				});
		}
		done();
//
		// now get it?
	})

})


describe('Testing DELETE /api/v1/politician/:politicianId/comment/:commentId', function(){
	var url = 'http://localhost:3001';

	it('should return error if the user Id does not exist in DB', function(done){
		request(url)
			.del('/api/v1/politician/1/comment/1')
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
			.del('/api/v1/politician/1/comment/1')
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
			.del('/api/v1/politician/10/comment/1')
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

	it('should return error if the commentId does not exist in the DB ', function(done){
		request(url)
			.del('/api/v1/politician/1/comment/10000')
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

	it('should return error if the user trying to delete the message does not own the comment', function(done){
		request(url)
			.del('/api/v1/politician/1/comment/1')
			.set('Accept', 'application/json')
			.set('UserId','2')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return 200 OK if user owns the comment', function(done){
		request(url)
			.del('/api/v1/politician/1/comment/1')
			.set('Accept', 'application/json')
			.set('UserId','1')
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


describe('Testing PUT /api/v1/politician/:politicianId/comment/:commentId', function(){
	var url = 'http://localhost:3001';

	it('should return error if the user Id does not exist in DB', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/2')
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
			.put('/api/v1/politician/1/comment/2')
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
			.put('/api/v1/politician/10/comment/2')
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

	it('should return error if the commentId does not exist in the DB ', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/10000')
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

	it('should return error if the user trying to change the message does not own the comment', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/2')
			.set('Accept', 'application/json')
			.set('UserId','2')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
//				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 401);
				done();
			});
	})

	it('should return error if the body does not contain new text in correct format or is blank - test I', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/2')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return error if the body does not contain new text in correct format or is blank - test II', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/2')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(commentBadFormat)
			.end(function(err, res) {
				assert.equal(err, null);
				var body = res.body;
				console.log("res body: " + JSON.stringify(body));
				//check everything works...
				assert.equal(body.responseCode, 666);
				done();
			});
	})

	it('should return ok if the body contains new text', function(done){
		request(url)
			.put('/api/v1/politician/1/comment/2')
			.set('Accept', 'application/json')
			.set('UserId','1')
			.send(commentNewText)
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

