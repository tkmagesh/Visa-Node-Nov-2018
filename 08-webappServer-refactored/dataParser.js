var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	var urlObj =  url.parse(req.url);
	req['urlObj'] = urlObj;
	var queryData = querystring.parse(urlObj.query);
	req['queryData'] = queryData;
	var rawData = '';
	req.on('data', function(chunk){
		rawData += chunk;
	});
	req.on('end', function(){
		req['bodyData'] = querystring.parse(rawData);
		next();
	});
}