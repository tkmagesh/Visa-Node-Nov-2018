var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.xml', '.json', '.txt'];

function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname,
		resourcePath = path.join(__dirname, resourceName);
	if (isStatic(resourceName) && fs.existsSync(resourcePath)){
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
		stream.on('end', next);
	} else {
		next();
	}
}