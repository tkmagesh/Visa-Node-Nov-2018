var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.xml', '.json', '.txt'];

function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(staticFolderPath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname,
			resourcePath = path.join(staticFolderPath, resourceName);
		if (isStatic(resourceName) && fs.existsSync(resourcePath)){
			var stream = fs.createReadStream(resourcePath);
			console.log(res.statusCode);
			stream.pipe(res);
			stream.on('close', next);
		} else {
			next();
		}
	}
}