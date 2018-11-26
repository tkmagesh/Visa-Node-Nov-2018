var calculator = {
	add : function(x,y){
		return x + y;
	},
	subtract : function(x,y){
		return x - y;
	},
	multiply : function(x,y){
		return x * y;
	},
	divide : function(x,y){
		if (y === 0)
			throw new Error('Invalid arguments');
		return x / y;
	},
	divideAsync : function(x,y, resultCallback){
		setTimeout(function(){
			if (y === 0){
				var e = new Error('Invalid arguments');
				return resultCallback(e);
			}	
			var result = x / y;
			return resultCallback(null, result);
		}, 3000);
	}
};
console.log('@Calculator.js - calculator -> ', calculator);
module.exports = calculator;