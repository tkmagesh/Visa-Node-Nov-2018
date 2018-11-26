var calculator = require('./calculator');
console.log('@CalculatorClient.js - calculator -> ', calculator);
var x = 100,
	y = 200;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));


console.log(calculator.divideAsync(10,2, function(err, result){
	if (err){
		console.log(err.message);
	} else  {
		console.log(result);
	}
}));
console.log('end of calculatorClient.js')