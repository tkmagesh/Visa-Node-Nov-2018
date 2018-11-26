var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	
	var urlObj =  url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var queryData = querystring.parse(urlObj.query),
		x = parseInt(queryData.x),
		y = parseInt(queryData.y),
		op = queryData.op;

	var result = calculator[op](x,y);
	res.write(result.toString());
	res.end();

});

server.listen(8085);

console.log('server listening on 8085!');