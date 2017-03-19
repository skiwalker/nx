var db = require('../config/database');
var RoleModel = {};

RoleModel.findRole = function(query, callback) {
  db.collection('role').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
};

RoleModel.create = function(query, callback) {
	
	db.collection('role').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		}
		callback(null, data.ops[0]);
	});
};

module.exports = RoleModel;