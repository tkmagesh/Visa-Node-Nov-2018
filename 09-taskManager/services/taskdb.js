//all persistence logic for tasks goes here
var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/tasksdb.json');

function readAll(callback){
	
	fs.readFile(dbFile, {encoding : 'utf8'}, function(err, fileContents){
		if (err){
			callback(err);
		} else {
			var result = JSON.parse(fileContents);
			callback(null, result);
		}
	})
}

function save(/*....*/){

}

module.exports = {
	readAll : readAll
};