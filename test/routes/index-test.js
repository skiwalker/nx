var assert = require('assert');
var supertest = require('supertest');  
var chai = require('chai');
var app = require('../../app.js');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

var defaultHero = {
	name: 'Batman'
};

describe('GET super-hero', function() {
  it.only('list super hero', function(done) {
    request
			.get('v1/super-hero')
			.set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .end(function(err, res) {
				//expect(res.body[0].name).to.eql(defaultHero.name);
        done(err);
      });
  });
});