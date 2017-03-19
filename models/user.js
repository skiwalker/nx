var mongoose = require('mongoose');
var db = require('../config/database');
var UserModel = {};

UserModel.login = function(query, callback) {
	
  db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
};


UserModel.findUser = function(query, callback) {
	
  db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
};



UserModel.create = function(query, callback) {
	
	db.collection('users').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, data.ops[0]);
		}
		mongoose.connection.close();
	});
};

UserModel.validate = function(query, callback) {
	db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

UserModel.update = function(query, callback) {
	db.collection('users').updateOne(
	{ "_id": query._id },
	{ $set: query.body },
	function(err, results) {
		if(err){
			callback(err);
		} else {
			callback(null, results);
		}
		mongoose.connection.close();
	});
}

UserModel.list = function(query, callback) {
	db.collection('users').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		} else {
			callback(null, data);
		}
		mongoose.connection.close();
	});
}

UserModel.getId = function(query, callback) {
	db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

UserModel.delete = function(query, callback) {
	db.collection('users').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

module.exports = UserModel;