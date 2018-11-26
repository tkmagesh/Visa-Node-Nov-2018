var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.xml', '.json', '.txt'];

function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	var urlObj =  url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	if (isStatic(urlObj.pathname)){
		var resourcePath = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query),
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			op = queryData.op;

		var result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData),
				x = parseInt(bodyData.x),
				y = parseInt(bodyData.y),
				op = bodyData.op;

			var result = calculator[op](x,y);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

console.log('server listening on 8080!');