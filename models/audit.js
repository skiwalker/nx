var db = require('../config/database');
var AuditModel = {};

AuditModel.create = function(query, callback) {
	
	db.collection('AuditEvent').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		}
		callback(null, data.ops[0]);
	});
};

module.exports = AuditModel;