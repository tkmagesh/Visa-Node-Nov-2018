var chalk = require('chalk');

module.exports = function(req, res, next){
	var logMessage = chalk.blue(req.method) + '\t' + chalk.red(req.urlObj.pathname) + '\t';
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date(),
			elapsedTime = endTime - startTime;
			logMessage += chalk.magenta(res.statusCode) + ' - ' + chalk.underline(elapsedTime + 'ms');
		console.log(logMessage);
	});
	next();
};