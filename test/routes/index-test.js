var assert = require('assert');
var supertest = require('supertest');  
var chai = require('chai');
var uuid 	= require('uuid');
var app = require('../../app.js');
var modelHero = require('../../models/hero');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

var id 	= uuid.v4();
var query = { _id: id, name: 'Batman', alias: 'Bruce Wayne' };

describe('GET super-hero', function() {
	
	beforeEach(function(done) {
		modelHero.create(query, function(err, dataHero) {
			//modelHero.delete({_id:dataHero._id}, function(err, data) {
				done();
			//});
		});
	});
	
  it.only('list super hero', function(done) {
    request
			.get('v1/super-hero')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				//expect(res.body[0].name).to.eql(defaultHero.name);
        done(err);
      });
  });
});