var mongoose = require('mongoose');
var db = require('../config/database');
var AuditModel = {};

AuditModel.create = function(query, callback) {
	
	db.collection('AuditEvent').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, data.ops[0]);
		}
		mongoose.connection.close();
	});
};

module.exports = AuditModel;