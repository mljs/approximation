var math = require("mathjs");

Interpolate = {
	
	/*
	 * Function that return the Lagrange interpolating polynomial function.
	 * 
	 * @param {Vector} X - Vector of the x positions of the points.
	 * @param {Vector} Y - Vector of the y positions of the points.
	 * @return {function} function - Function that interpolate the given points.
	 * 
	 * */	
	
	lagrange : function(X, Y) {
		var size = math.subset(math.size(X), math.index(0));
		var denominators = math.ones(size);
		var func = "f(x) = ";
		for(var i = 0; i < size; ++i) {
			for(var j = 0; j < size; ++j) {
				if(i != j) {
					var value = math.multiply(math.subset(denominators, math.index(i)), math.add(math.subset(X, math.index(i)), -math.subset(X, math.index(j))));
					denominators = math.subset(denominators, math.index(i), value);
				}
			}
			var actualCoefficient = math.divide(math.subset(Y, math.index(i)), math.subset(denominators, math.index(i)));
			if(i != 0) {
				func += " + ";
			}
			func += actualCoefficient + " * ";
			var firstTime = true;
			for(var j = 0; j < size; ++j) {
				if(i != j) {
					if(firstTime) {
						firstTime = false;
					} else {
						func += " * ";
					}
					func += "( x - " + math.subset(X, math.index(j)) + " )";
				}
			}
		}

		return math.eval(func);
		
	},
	
	/*
	 * Function that returns the coefficients of the Newton interpolating polynomial.
	 *
	 * @param {Vector} X - Vector of the x positions of the points.
     * @param {Vector} Y - Vector of the y positions of the points.
	 * @return {Vector} coefficients - Coefficients of the interpolating polynomial given from lower to higher order of
	   * the polynomial.
	 * */

 	newton : function(X, Y) {
		var lengthX = math.subset(math.size(X), math.index(0));
		var D = math.zeros(lengthX, lengthX);
		D = math.subset(D, math.index([0, lengthX], 0), math.transpose(Y));
		for(var j = 1; j < lengthX; ++j) {
			for(var k = j; k < lengthX; ++k){
				var numerator = math.add(math.subset(D, math.index(k, j - 1)), -math.subset(D, math.index(k - 1, j - 1)));
				var denominator = math.add(math.subset(X, math.index(k)), -math.subset(X, math.index(k - j)) );
				D = math.subset(D, math.index(k, j), numerator / denominator);
			}
		}

		var coefficients = math.zeros(lengthX);
		for(var i = 0; i < lengthX; ++i) {
			var value = math.subset(D, math.index(i, i));
			coefficients = math.subset(coefficients, math.index(i), value);
		}
		return coefficients;
	}
};