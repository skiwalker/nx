var db = require('../config/database');
var UserModel = {};

UserModel.login = function(query, callback) {
	
  db.collection('users').findOne(query, function(err, data) {
	  if(err){
		callback(err);
	  }
	  callback(null, data);
  });
};


UserModel.findUser = function(query, callback) {
	
  db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
};



UserModel.create = function(query, callback) {
	
	db.collection('users').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		}
		callback(null, data.ops[0]);
	});
};

UserModel.validate = function(query, callback) {
	db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

UserModel.update = function(query, callback) {
	db.collection('users').updateOne(
	{ "_id": query._id },
	{ $set: query.body },
	function(err, results) {
		if(err){
			callback(err);
		}
		callback(null, results);
	});
}

UserModel.list = function(query, callback) {
	db.collection('users').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		}
		callback(null, data);
	});
}

UserModel.getId = function(query, callback) {
	db.collection('users').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

UserModel.delete = function(query, callback) {
	db.collection('users').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

module.exports = UserModel;