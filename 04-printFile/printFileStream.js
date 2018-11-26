var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', {encoding : 'utf8'});


var readCount = 0;
stream.on('data', function(chunk){
	console.log(chunk);
	++readCount;
});

stream.on('end', function(){
	console.log('Thats all folks!');
	console.log('read completed with ' + readCount + ' reads');
});

stream.on('error', function(err){
	console.log(err.message);
});

/*stream.on('data', function(chunk){
	console.log(chunk);
});*/

//stream.pipe(process.stdout);
