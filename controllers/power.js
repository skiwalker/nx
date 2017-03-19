var uuid 	= require('uuid');
var model = require('../models/power');
var modelHero = require('../models/hero');
var modelAudit = require('../models/audit');
var controllerAudit = require('./audit');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');
var power = {};

power.create = function(req, res, next) {
	
	var id 	= uuid.v4();
	var query = { _id: id, idHero: req.body.idHero, name: req.body.name, description: req.body.description };
	
	async.waterfall([
		function(callback) {
			model.validate({name: req.body.name}, function(err, data) {
				if(err){
					throw err;
				}
				if(!_.isEmpty(data)){
					callback({ message: 'Super power already registered' }, null);
				} else {
					callback(null, data);
				}
			});
		},
		function(arg1, callback) {
			model.create(query, function(err, data) {
				if(err){
					throw err;
				}
				if(data) {
					callback(null, arg1, data);
				} else {
					callback({ message: 'Error contact administrator' }, null);
				}
			});
		},
		function(arg1, arg2, callback) {
			var token = {token: req.headers.token};
			var queryAudit = {
				entity: 'super-power',
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

power.update = function(req, res, next) {
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
				entity: 'super-power',
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

power.delete = function(req, res, next) {
	var query = {_id:req.params.id};
	async.waterfall([
		function(callback) {
			model.validate({_id: req.params.id}, function(err, data) {
				if(err){
					callback(err, null);
				}
				if(!_.isEmpty(data)){
					if(data.idHero) {
						callback({ message: 'We can not delete it because there is a hero using this power' }, null);
					} else {
						callback(null, data);
					}
				} else {
					callback(null, data);
				}
			});
		},
		function(arg1, callback) {
			model.delete(query, function(err, data) {
				if(err){
					throw err;
				}
				if(data) {
					callback(null, data);
				} else {
					callback({ message: 'Error contact administrator' }, null);
				}
			});
		},
		function(arg2, callback) {
			var token = {token: req.headers.token};
			var queryAudit = {
				entity: 'super-power',
				entityId: query._id,
				datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
				username: '',
				action: 'delete'
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
				res.status(200).send(arg2);
			}
		}
	);
}

power.list = function(req, res, next) {
	model.list({}, function(err, data) {
		if(err){
			throw err;
		}
		if(data) {
			res.status(200).send(data);
		} else {
			res.status(422).send({ message: 'Error contact administrator' });
		}
	});
}

power.getId = function(req, res, next) {
	var query = {_id:req.params.id};
	model.list(query, function(err, data) {
		if(err){
			throw err;
		}
		if(data) {
			res.status(200).send(data);
		} else {
			res.status(422).send({ message: 'Error contact administrator' });
		}
	});
}

module.exports = power;