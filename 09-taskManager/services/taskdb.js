//all persistence logic for tasks goes here
var fs = require('fs'),
	path = require('path'),
	util = require('util');

var dbFile = path.join(__dirname, '../db/tasksdb.json');

/*function promisify(callbackBasedApi){
	return function(){
		var args = arguments;
		var promise = new Promise(function(resolveFn, rejectFn){
			callbackBasedApi(...args, function(err, result){
				if (err){
					rejectFn(err);
				} else {
					resolveFn(result);
				}
			})
		});
		return promise;
	}
}*/

/*function readAll(){

	var promise = new Promise(function(resolveFn, rejectFn){
		fs.readFile(dbFile, {encoding : 'utf8'}, function(err, fileContents){
			if (err){
				rejectFn(err);
			} else {
				var tasks = JSON.parse(fileContents);
				resolveFn(tasks);
			}
		})
	});
	return promise;
}*/

function readAll(){
	var readFileAsync = util.promisify(fs.readFile);
	return readFileAsync(dbFile, {encoding : 'utf8'})
		.then(function(fileContents){
			return JSON.parse(fileContents);
		});
}

/*function save(tasks){
	var promise = new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dbFile, JSON.stringify(tasks), function(err){
			if (err){
				rejectFn(err);
			} else {
				resolveFn();
			}
		})	
	});
	return promise;
}*/

function save(tasks){
	var writeFileAsync = util.promisify(fs.writeFile);
	return writeFileAsync(dbFile, JSON.stringify(tasks));
}

module.exports = {
	readAll : readAll,
	save : save
};