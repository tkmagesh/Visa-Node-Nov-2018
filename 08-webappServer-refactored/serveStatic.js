var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.xml', '.json', '.txt'];

function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			console.log('[@serveStatic] - serving 404');
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
		stream.on('end', next);
		/*stream.on('data', function(chunk){
			console.log('[@serveStatic] - serving file chunk');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[@serveStatic] - closing the response stream');
			res.end();
			next();
		});*/
	} else {
		next();
	}
}