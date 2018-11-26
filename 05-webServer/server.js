var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	console.log(req.method + '\t' + req.url);
	var resourcePath = path.join(__dirname, req.url);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	var stream = fs.createReadStream(resourcePath);
	/*stream.on('data', function(chunk){
		res.write(chunk);
	});
	stream.on('end', function(){
		res.end();
	});*/
	stream.pipe(res);
	stream.on('error', function(err){
		res.write(err.message);
		res.end();
	});
});

server.listen(8080);

console.log('server listening on 8080!');