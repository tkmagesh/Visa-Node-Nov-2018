//all persistence logic for tasks goes here
var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/tasksdb.json');

function readAll(){
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
}

function save(tasks){
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
}

module.exports = {
	readAll : readAll,
	save : save
};