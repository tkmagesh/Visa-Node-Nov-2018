var url = require('url'),
	querystring = require('querystring');

module.exports = function(req){
	var urlObj =  url.parse(req.url);
	req['urlObj'] = urlObj;
	var queryData = querystring.parse(urlObj.query);
	req['queryData'] = queryData;
}