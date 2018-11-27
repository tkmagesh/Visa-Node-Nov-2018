var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname;
	if (resourceName === '/calculator'){
		var calcData = req.method === 'GET' ? req.queryData : req.bodyData,
			x = parseInt(calcData.x),
			y = parseInt(calcData.y),
			op = calcData.op;

		var result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
		next();
	} else {
		next();
	}
};