require("../src/fit");
require("../src/interpolate");

var math = require('mathjs');

describe('Approximation', function() {

    describe('Fit', function() {

        it('Linear fit', function() {
            var x = math.matrix([-1, 0, 1, 2, 3, 4, 5, 6]);
            var y = math.matrix([10, 9, 7, 5, 4, 3, 0, -1]);
            var result = Fit.linearFit(x, y);
            result.A.should.be.approximately(-1.6071429, 10e-7);
            result.B.should.be.approximately(8.6428571, 10e-7);
        });

        it('Potential fit', function () {
            var x = math.matrix([0.2, 0.4, 0.6, 0.8, 1.0]);
            var y = math.matrix([0.1960, 0.7850, 1.7665, 3.1405, 4.9075]);
            var result = Fit.potentialFit(x, y, 2);
            result.should.be.approximately(4.9073, 10e-5);
        });

        it('Linearization', function () {
            var x = math.matrix([0, 1, 2, 3, 4]);
            var y = math.matrix([1.5, 2.5, 3.5, 5.0, 7.5]);
            var result = Fit.linearization(x, y);
            result.A.should.be.approximately(0.3912023, 10e-7);
            result.C.should.be.approximately(1.579910, 10e-7);
        });

        it('Polynomial fit', function () {
            var x = math.matrix([-3, 0, 2, 4]);
            var y = math.matrix([3, 1, 1, 3]);
            var result = Fit.polynomialFit(x, y, 2);
            var expected = [0.850519, -0.192495, 0.178462];
            for(var i = 0; i < expected.length; ++i) {
                math.subset(result, math.index(i, 0)).should.be.approximately(expected[i], 10e-6);
            }
        });

    });

    describe('Interpolate', function () {

         it('Lagrange', function () {
             var x = math.matrix([0.0, 1.2]);
             var y = math.matrix([1.0, 0.362358]);
             var f = Interpolate.lagrange(x, y);

             x = [0.1, 0.3, 0.5, 0.7, 0.9, 1.1];
             var answers = [0.946863, 0.840589, 0.734316, 0.628042, 0.521768, 0.415495];
             for(var i = 0; i < answers.length; ++i) {
                 f(x[i]).should.be.approximately(answers[i], 10e-6);
             }
         });

         it('Newton', function () {
              var x = math.matrix([0, 1, 2, 3, 4]);
              var y = math.matrix([1, 0.54030223, -0.4161468, -0.9899925, -0.6536436]);
              var coefficients = Interpolate.newton(x, y);

              var solutions = [1.0, -0.4596977, -0.2483757, 0.1465592, -0.0146568];
              for(var i = 0; i < solutions.length; ++i) {
                  math.subset(coefficients, math.index(i)).should.be.approximately(solutions[i], 10e-7);
              }
         });
    });

});