var assert = require('assert');
var supertest = require('supertest');  
var chai = require('chai');
var uuid = require('uuid');
var app = require('../../app.js');
var modelUser = require('../../models/user');
var moment = require('moment');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

describe('Controller user', function() {
	
  it('GET user', function(done) {
    request
			.get('/v1/user')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body[0].username).to.eql('adm');
				expect(res.body[0].token).to.eql('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODk5NDE5OTEsImV4cCI6MTQ4OTk0Mzc5MX0.WlElyQUijJJeFHjHwhY67uWuQwCIT33avmijWJqaMHs');
        done(err);
      });
  });
	
	 it('GET /ID user', function(done) {
    request
			.get('/v1/user/07821246-b8e6-491b-81ef-606d8617abf2')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body[0].username).to.eql('adm');
				expect(res.body[0].token).to.eql('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODk5NDE5OTEsImV4cCI6MTQ4OTk0Mzc5MX0.WlElyQUijJJeFHjHwhY67uWuQwCIT33avmijWJqaMHs');
        done(err);
      });
  });
	
});
