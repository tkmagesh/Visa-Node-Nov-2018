module.exports = function(){
	return {
		result : 0,
		add : function(x){
			this.result += x;
		},
		subtract : function(x){
			this.result -= x;
		},
		multiply : function(x){
			this.result *= x;
		},
		divide : function(x){
			this.result /= x;
		},
		getResult : function(){
			return this.result;
		}
	};
}
