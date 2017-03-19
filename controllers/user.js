var uuid 	= require('uuid');
var model = require('../models/user');
var modelRole = require('../models/role');
var controllerAudit = require('./audit');
var async = require('async');
var _ = require('lodash');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var user = {};

user.create = function(req, res, next) {
	
	var id 	= uuid.v4();
	var getToken = jwt.sign({ username: req.body.name, iat: Math.floor(Date.now() / 1000) - 30 }, 'nextel', { expiresIn: 1800 });
	console.log(getToken);
	var query = { _id: id, username: req.body.username, password: passwordHash.generate(req.body.password), token: getToken};
	
	async.waterfall([
		function(callback) {
			model.validate({username: req.body.username}, function(err, data) {
				if(err){
					callback(err);
				}
				if(!_.isEmpty(data)){
					callback({ message: 'User already registered' }, null);
				} else {
					callback(null, data);
				}
			});
		},
		function(arg1, callback) {
			model.create(query, function(err, data) {
				if(err){
					callback(err);
				}
				callback(null, arg1, data);
			});
		},
		function(arg1, arg2, callback) {
			var queryRole = { _id:uuid.v4(), name: arg2.username, idUser:arg2._id, adm: req.body.role };
			modelRole.create(queryRole, function(err, data) {
				if(err){
					callback(err);
				}
				callback(null, arg1, arg2);
			});
		},
		function(arg1, arg2, callback) {
			var token = {token: req.headers.token};
			var queryAudit = {
				entity: 'user',
				entityId: id,
				datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
				username: '',
				action: 'create'
			};
			controllerAudit.create(token, queryAudit, function(err, resultAudit) {
				if(err) {
					callback(err, null);
				}
				callback(null, arg2);
			});
		}],
		function(err, arg2) {
			if(err) {
				res.status(422).json({ message: err.message });
			} else {
				res.status(201).send(arg2);
			}
		}
	);
};

user.update = function(req, res, next) {
	var query = { _id: req.params.id, body:req.body };
	
	async.waterfall([
		function(callback) {
			model.update(query, function(err, data) {
				if(err){
					callback(err, null);
				}
				callback(null, data);
			});
		},
		function(arg1, callback) {
			var token = {token: req.headers.token};
			var queryAudit = {
				entity: 'user',
				entityId: query._id,
				datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
				username: '',
				action: 'update'
			};
			
			controllerAudit.create(token, queryAudit, function(err, resultAudit) {
				if(err) {
					callback(err, null);
				}
				callback(null, arg1);
			});
		}],
		function(err, arg1) {
			if(err) {
				res.status(422).json({ message: err.message });
			} else {
				res.status(200).send(arg1);
			}
		}
	);
};

user.delete = function(req, res, next) {
	var query = { _id: req.params.id };
	
	async.waterfall([
		function(callback) {
			
			model.delete(query, function(err, data) {
				if(err){
					callback(err, null);
				}
				callback(null, data);
			});
		},
		function(arg1, callback) {
			var token = {token: req.headers.token};
			var queryAudit = {
				entity: 'user',
				entityId: query._id,
				datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
				username: '',
				action: 'delete'
			};
			
			controllerAudit.create(token, queryAudit, function(err, resultAudit) {
				if(err) {
					callback(err, null);
				} 
				callback(null, arg1);
			});
		}],
		function(err, arg1) {
			if(err) {
				res.status(422).json({ message: err.message });
			} else {
				res.status(200).send(arg1);
			}
		}
	);
};

user.list = function(req, res, next) {
	model.list({}, function(err, data) {
		if(err){
			res.status(422).send({ message: 'Error contact administrator' });
		}
		if(data) {
			res.status(200).send(data);
		}
	});
}

user.getId = function(req, res, next) {
	var query = {_id:req.params.id};
	model.list(query, function(err, data) {
		if(err){
			res.status(422).send({ message: 'Error contact administrator' });
		}
		if(data) {
			res.status(200).send(data);
		}
	});
}

module.exports = user;