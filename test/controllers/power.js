var assert = require('assert');
var supertest = require('supertest');  
var chai = require('chai');
var uuid = require('uuid');
var app = require('../../app.js');
var modelHero = require('../../models/hero');
var modelPower = require('../../models/power');
var moment = require('moment');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

var idHero 	= uuid.v4();
var nameHero = 'Batman ' + moment().format('YYYYMMDDHHmmss');
var queryHero = { _id: idHero, name: nameHero, alias: 'Bruce Wayne' };

var idPower = uuid.v4();
var namePower = 'Arte Marcial ' + moment().format('YYYYMMDDHHmmss');
var queryPower = { _id: idPower, idHero: idHero, name: namePower, description: 'Melhor lutador de artes marciais do mundo' };

describe('Controller super-power', function() {
	
	beforeEach(function(done) {
		modelHero.create(queryHero, function(err, dataHero) {
			modelPower.create(queryPower, function(err, dataPower) {
				done();
			});
		});
	});
	
	afterEach(function(done){
		modelHero.delete({_id: idHero}, function(err, data) {
			modelPower.delete({_id: idPower}, function(err, data) {
				done();
			});
		});
	});
	
  it('GET super power', function(done) {
    request
			.get('/v1/super-power')
			.set('Accept', 'application/json')
      .end(function(err, res) {
				expect(res.body[0].name).to.eql(queryPower.name);
				expect(res.body[0].description).to.eql(queryPower.description);
        done(err);
      });
  });
});