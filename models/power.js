var db = require('../config/database');
var PowerModel = {};


PowerModel.create = function(query, callback) {
	
	db.collection('SuperPower').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		}
		callback(null, data.ops[0]);
	});
};

PowerModel.validate = function(query, callback) {
	db.collection('SuperPower').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

PowerModel.update = function(query, callback) {
	db.collection('SuperPower').updateOne(
	{ "_id": query._id },
	{ $set: query.body },
	function(err, results) {
		if(err){
			callback(err);
		}
		callback(null, results);
	});
}

PowerModel.list = function(query, callback) {
	db.collection('SuperPower').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		}
		callback(null, data);
	});
}

PowerModel.getId = function(query, callback) {
	db.collection('SuperPower').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

PowerModel.delete = function(query, callback) {
	console.log(query);
	db.collection('SuperPower').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

module.exports = PowerModel;