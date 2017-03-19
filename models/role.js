var mongoose = require('mongoose');
var db = require('../config/database');
var RoleModel = {};

RoleModel.findRole = function(query, callback) {
  db.collection('role').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
};

RoleModel.create = function(query, callback) {
	
	db.collection('role').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, data.ops[0]);
		}
		mongoose.connection.close();
	});
};

module.exports = RoleModel;