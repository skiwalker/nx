var uuid 	= require('uuid');
var model = require('../models/hero');
var controllerAudit = require('./audit');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');
var hero = {};

hero.create = function(req, res, next) {
	
	var id 	= uuid.v4();
	var query = { _id: id, name: req.body.name, alias: req.body.alias };
	
	async.waterfall([
		function(callback) {
			model.validate({name: req.body.name}, function(err, data) {
				if(err){
					callback(err);
				}
				if(!_.isEmpty(data)){
					callback({ message: 'Super hero already registered' }, null);
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
			var token = {username: req.headers.username, token: req.headers.token};
			var queryAudit = {
				entity: 'super-hero',
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

hero.update = function(req, res, next) {
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
			var token = {username: req.headers.username, token: req.headers.token};
			var queryAudit = {
				entity: 'super-hero',
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

hero.delete = function(req, res, next) {
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
			var token = {username: req.headers.username, token: req.headers.token};
			var queryAudit = {
				entity: 'super-hero',
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

hero.list = function(req, res, next) {
	model.list({}, function(err, data) {
		if(err){
			res.status(422).send({ message: 'Error contact administrator' });
		}
		if(data) {
			res.status(200).send(data);
		}
	});
}

hero.getId = function(req, res, next) {
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

module.exports = hero;