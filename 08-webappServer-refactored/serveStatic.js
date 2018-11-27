var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.xml', '.json', '.txt'];

function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
	}
}