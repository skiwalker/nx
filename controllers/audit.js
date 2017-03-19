var model = require('../models/audit');
var modelUser = require('../models/user');
var async = require('async');
var audit = {};

audit.create = function(token, query, cb) {
	
	async.waterfall([
    function(callback) {
			modelUser.findUser(token, function(err, data) {
				if(err){
					callback(err, null);
				}
				if(data) {
					callback(null, data);
				}
			});
    },
		function(arg1, callback) {
			query.username = arg1.username;
			model.create(query, function(err, data) {
				if(err){
					callback({ message: 'Erro entre em contato com administrador' }, null);
				}
				if(data) {
					callback(null, data);
				}
			});
    }],
		function(err, results) {
			if(err) {
				cb(err, null);
			} else {
				cb(null, results);
			}
		}
	);
}

module.exports = audit;