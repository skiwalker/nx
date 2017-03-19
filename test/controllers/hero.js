var assert = require('assert');
var supertest = require('supertest');  
var chai = require('chai');
var uuid = require('uuid');
var app = require('../../app.js');
var modelHero = require('../../models/hero');
var moment = require('moment');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

var id 	= uuid.v4();
var query = { _id: id, name: 'Batman', alias: 'Bruce Wayne' };

describe('Controller super-hero', function() {
	
	beforeEach(function(done) {
		modelHero.create(query, function(err, dataHero) {
			done();
		});
	});
	
	afterEach(function(done){
		modelHero.delete({_id: query._id}, function(err, data) {
			done();
		});
	});
	
  it('GET super hero', function(done) {
    request
			.get('/v1/super-hero')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body[0].name).to.eql(query.name);
				expect(res.body[0].alias).to.eql(query.alias);
        done(err);
      });
  });
	
	it('GET/ID super hero id', function(done) {
		
		var newID = uuid.v4();
		var name = 'Batman ' + moment().format('YYYYMMDDHHmmss');
		var queryNew = { _id: newID, name: name, alias: 'Bruce Wayne' };
		
		modelHero.create(queryNew, function(err, dataHero) {
		});
		
    request
			.get('/v1/super-hero/'+newID)
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body[0].name).to.eql(queryNew.name);
				expect(res.body[0].alias).to.eql(queryNew.alias);
        done(err);
      });
  });
	
	it('POST super hero already registered', function(done) {
    request
			.post('/v1/super-hero')
			.send(query)
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODk5NDE5OTEsImV4cCI6MTQ4OTk0Mzc5MX0.WlElyQUijJJeFHjHwhY67uWuQwCIT33avmijWJqaMHs')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body).to.deep.equal({ message: 'Super hero already registered' });
        done(err);
      });
  });
	
	it('POST create super hero', function(done) {
		
		var newID = uuid.v4();
		var name = 'Batman ' + moment().format('YYYYMMDDHHmmss');
		var queryNew = { _id: newID, name: name, alias: 'Bruce Wayne' };
		
    request
			.post('/v1/super-hero')
			.send(queryNew)
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODk5NDE5OTEsImV4cCI6MTQ4OTk0Mzc5MX0.WlElyQUijJJeFHjHwhY67uWuQwCIT33avmijWJqaMHs')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body).to.have.property('name');
				expect(res.body).to.have.property('alias');
        done(err);
      });
			
  });	
	
	it('PATCH update super hero', function(done) {
		
		var newID = uuid.v4();
		var name = 'Batman ' + moment().format('YYYYMMDDHHmmss');
		var queryNew = { _id: newID, name: name, alias: 'Bruce Wayne' };
		var queryUpdate = { _id: newID, name: 'Super Batman', alias: 'Bruce Wayne' };
		
		modelHero.create(queryNew, function(err, dataHero) {
		});
		
    request
			.patch('/v1/super-hero/'+newID)
			.send(queryUpdate)
			.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODk5NDE5OTEsImV4cCI6MTQ4OTk0Mzc5MX0.WlElyQUijJJeFHjHwhY67uWuQwCIT33avmijWJqaMHs')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body.ok).to.eql(1);
				expect(res.body.nModified).to.eql(1);
        done(err);
      });
  });
});