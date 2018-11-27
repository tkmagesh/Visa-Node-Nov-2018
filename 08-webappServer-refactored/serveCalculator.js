var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname;
	if (resourceName === '/calculator' && req.method === 'GET'){
		var queryData = req.queryData,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			op = queryData.op;

		var result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
		next();
	} else if (resourceName === '/calculator' && req.method === 'POST'){
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
			next();
		});
	} else {
		next();
	}
};