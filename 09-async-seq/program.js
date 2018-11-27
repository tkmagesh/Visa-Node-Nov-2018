function f1Sync(){
	console.log('f1Sync triggered');
	console.log('f1Sync completed');
}

function f2Sync(){
	console.log('f2Sync triggered');
	console.log('f2Sync completed');
}

function f3Sync(){
	console.log('f3Sync triggered');
	console.log('f3Sync completed');
}

function f4Sync(){
	console.log('f4Sync triggered');
	console.log('f4Sync completed');
}

/*function runSync(){
	f1Sync();
	f2Sync();
	f3Sync();
	f4Sync();
}*/

var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

function runSync(){
	for(var index = 0, count = syncFns.length; index < count; index++){
		var syncFn = syncFns[index];
		syncFn();
	}
}


module.exports['runSync'] = runSync;

function f1Async(next){
	console.log('f1Async triggered');
	setTimeout(function(){
		console.log('f1Async completed');
		if (typeof next === 'function')
			next();
	}, 2000);
}

function f2Async(next){
	console.log('f2Async triggered');
	setTimeout(function(){
		console.log('f2Async completed');
		if (typeof next === 'function')
			next();
	}, 4000);
}

function f3Async(next){
	console.log('f3Async triggered');
	setTimeout(function(){
		console.log('f3Async completed');
		if (typeof next === 'function')
			next();
	}, 3000);
}

function f4Async(next){
	console.log('f4Async triggered');
	setTimeout(function(){
		console.log('f4Async completed');
		if (typeof next === 'function')
			next();
	}, 5000);
}

function runAsync(){
	f1Async(function(){
		f2Async(function(){
			f3Async(function(){
				f4Async();
			});
		});
	});
}

module.exports['runAsync'] = runAsync;