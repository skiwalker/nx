'use strict';

var model = require('../models/user');
var modelRole = require('../models/role');
var async = require('async');
var _ = require('lodash');
var validation = {};

function checkErrors(req, res, next) {
  var errors = req.validationErrors();
  if (errors) {
    var listaErros = [];
    for (var i = 0, tam = errors.length; i < tam; i++) {
      listaErros.push(errors[i].msg);
    }
    res.status(422).json({ message: listaErros });
  } else {
		
		var method = req.route.stack[0].method;
		var path = req.route.path;
		
		if(method !== 'get' && path !== '/login') {
			
			if(!req.headers.token) {
				res.status(422).json({ message: 'Invalid Token' });
			} else {
				async.waterfall([
				function(callback) {
					var query = {token: req.headers.token};
					model.findUser(query, function(err, data) {
						if(err){
							throw err;
						}
						
						if(!_.isEmpty(data)){
							var result = {flag: true, data};
							callback(null, result);
						}else{
							var result = { flag: false, message: 'Invalid Token' };
							callback(result, null);
						}
					});
				},
				function(result, callback) {
					
					if(!result.flag) {
						callback({message:result.message}, null);
					} else {
							var query = {name: result.data.username, adm: true};
							console.log(query);
							modelRole.findRole(query, function(err, data){
							if(err){
								throw err;
							}
							if(!_.isEmpty(data)){
								var resultRole = {flag: true, data:data};
								callback(null, result);
							}else{
								var resultRole = { flag: false, message: 'Access denied' };
								callback(resultRole, null);
							}
						});
					}
				}],
				function(err, results) {
					if(err) {
						res.status(422).json({ message: err.message });
					} else {
						next();
					}
				});
			}
		} else {
			next();
		}
  }
}


validation.login = function(req, res, next) {
  req.checkBody('username', 'username field can not be empty').notEmpty();
  req.checkBody('password', 'password field can not be empty').notEmpty();
  checkErrors(req, res, next);
}

validation.superHero = function(req, res, next) {
	req.checkBody('name', 'name field can not be empty').notEmpty();
	req.checkBody('alias', 'alias field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.superHeroUpdate = function(req, res, next) {
	req.checkBody('name', 'name field can not be empty').notEmpty();
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.superHeroDelete = function(req, res, next) {
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.superPower = function(req, res, next) {
	req.checkBody('name', 'name field can not be empty').notEmpty();
	req.checkBody('description', 'description field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.superPowerUpdate = function(req, res, next) {
	req.checkBody('name', 'name field can not be empty').notEmpty();
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.superPowerDelete = function(req, res, next) {
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.user = function(req, res, next) {
	req.checkBody('username', 'username field can not be empty').notEmpty();
	req.checkBody('password', 'password field can not be empty').notEmpty();
	req.checkBody('role', 'password field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.userUpdate = function(req, res, next) {
	req.checkBody('username', 'uername field can not be empty').notEmpty();
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

validation.userDelete = function(req, res, next) {
	req.checkParams('id', 'id field can not be empty').notEmpty();
	checkErrors(req, res, next);
}

module.exports = validation;