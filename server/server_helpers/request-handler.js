var bodyParser = require('body-parser');
var path = require('path');
var db = require('../db/config.js');
var Users = require('../db/collections/users');
var User = require('../db/models/user');

var Arc = require('../db/models/arc'); 
var Arcs = require('../db/collections/arcs'); 

var bluebird = require('bluebird'); 

module.exports.main = {
	get: function (req, res) {
		res.redirect('/signin'); 
	}
}; 

module.exports.signin = {
	get: function (req, res) {
		res.sendFile(path.normalize(__dirname + '/../../public/index.html')); 
	}, 

	post: function (req, res) {
		console.log('post request', req.body); 
		Users.reset()
		  .query({where: {fbId: req.body.userId}})
		  .fetch()
		  .then(function (allUsers) {
		    if (allUsers.length > 0) {
		      console.log('This username, ' + req.body.userId + ' already exists in the database');
				} else {
					new User({name: req.body.name, fbId: req.body.userId, access_token: req.body.access_token})
					.save()
					.then(function(data){
						console.log('user should have saved', data); 
					});
				}
				res.writeHead(201); 
        // res.redirect('/dashboard'); // How do you redirect to React path? 
				res.end(); 
		 	}); 
	}
}; 

module.exports.create = {
	get: function (req, res) {
		res.send('success'); 
	}, 

	post: function (req, res) {
		res.send('success'); 
	}
}

module.exports.dashboard = {
	get: function (req, res) {
		new Arc({token: '124'}).fetch({withRelated:['user', 'photos']}).then(function(data) {
			console.log("IN GET REQUEST TO DB", data); 
		}); 
	}
}; 