var model = require('../models/user');
var passwordHash = require('password-hash');
var _ = require('lodash');
var login = {};

login.index = function(req, res, next) {
	
	var query = { username: req.body.username };
	
	model.login(query, function(err, data) {
		if(err){
			res.status(422).send({ message: 'Incorrect username or password' });
		}
		if(!_.isEmpty(data)) {
			
			var pass = true;//passwordHash.verify(req.body.password, data.password);
			if(pass) {
				var dados = {
					username:data.username,
					token: data.token,
				};
				res.status(200).send(data);
			} else {
				res.status(422).send({ message: 'Incorrect username or password' });
			}
			
		} else {
			res.status(422).send({ message: 'User not found'});
		}
	}); 
};

module.exports = login;