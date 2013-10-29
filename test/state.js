/**
 *  State test cases...
 * /



 /*
 * User Test Cases...
 */

var should = require('should');
var request = require('supertest');
var assert = require('assert');



//todo some tests are failing ?

describe('Testing GET /api/v1/state', function(){
	var url = 'http://localhost:3001';



	it('should return all the states ', function(done){
		request(url)
			.get('/api/v1/state')
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

	it('should return error if stateid does not exist ', function(done){
		request(url)
			.get('/api/v1/state/100')
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

	it('should return 200 OK if stateid exists ', function(done){
		request(url)
			.get('/api/v1/state/1')
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









