describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Unspecified operation" });
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operation: foobar" });
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2-1" });
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2.1" });
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.5 });
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
    });

    describe('Subtraction', function () {
        it('subtracts two positive integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('subtracts zero from an integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('subtracts a negative integer from a positive integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 63 });
                    done();
                });
        });
        it('subtracts two negative integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('subtracts an integer from a floating point number', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 7.5 });
                    done();
                });
        });
        it('subtracts with negative exponent', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2.4e-5 });
                    done();
                });
        });
    });

    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies a positive integer with zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('multiplies a positive integer and negative integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies two floating point numbers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('multiplies supporting exponential notation', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=4.2e1&operand2=1e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
    });

    //todo: test for power
    describe('Power', function () {
        it('raises a positive integer to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 8 });
                    done();
                });
        });
        it('raises a positive integer to a negative integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.125 });
                    done();
                });
        });
        it('raises a negative integer to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=3')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -8 });
                    done();
                });
        });
        it('raises a negative integer to a negative integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.125 });
                    done();
                });
        });
        it('raises a positive integer to a zero power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        });
        it('raises a negative integer to a zero power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=0')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        });
        it('raises a positive integer to a floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.4142135623730951 });
                    done();
                });
        });
        it('raises a negative integer to a floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done(err);
                });
        });
        it('raises a positive integer to a negative floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=-0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.7071067811865475 });
                    done();
                });
        });
        it('raises a negative integer to a negative floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=-0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done(err);
                });
        });
        it('raises a positive floating point number to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 6.25 });
                    done(err);
                });
        });
        it('raises a positive floating point number to a negative integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2.5&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.16 });
                    done();
                });
        });
        it('raises a negative floating point number to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2.5&operand2=2')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 6.25 });
                    done();
                });
        });
        it('raises a negative floating point number to a negative integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2.5&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.16 });
                    done();
                });
        });
        it('raises a positive floating point number to a zero power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2.5&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        }
        );
        it('raises a negative floating point number to a zero power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2.5&operand2=0')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        }
        );
        it('raises a positive floating point number to a floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.5811388300841898 });
                    done();
                });
        }
        );
        it('raises a negative floating point number to a floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        }
        );
        it('raises a positive floating point number to a negative floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2.5&operand2=-0.5')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.6324555320336759 });                                    
                    done();
                });
        }
        );
        it('raises a negative floating point number to a negative floating point power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2.5&operand2=-0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });           
                    done();                                                     
                }
                );
        }                                                                                                                                                                                                           
        );
    });

    describe('Root', function () {
        it('finds the square root of a positive integer', function (done) {
            request.get('/arithmetic?operation=root&operand1=4&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2 });
                    done();
                });
        });
        it('finds the square root of a negative integer', function (done) {
            request.get('/arithmetic?operation=root&operand1=-4&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
        it('finds the square root of a positive floating point number', function (done) {
            request.get('/arithmetic?operation=root&operand1=4.2&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2.04939015319192 });
                    done();
                });
        }
        );
        it('finds the square root of a negative floating point number', function (done) {
            request.get('/arithmetic?operation=root&operand1=-4.2&operand2=2')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        }
        );
        it('finds the square root of a positive integer with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=4&operand2=2.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.7411011265922485 });
                    done();
                });
        }
        );
        it('finds the square root of a negative integer with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=-4&operand2=2.5')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        }
        );
        it('finds the square root of a positive floating point number with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=4.2&operand2=2.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.7411011265922485 });
                    done();
                });
        }
        );
        it('finds the square root of a negative floating point number with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=-4.2&operand2=2.5')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        }
        );
        it('finds the cube root of a positive integer', function (done) {
            request.get('/arithmetic?operation=root&operand1=8&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2 });
                    done();
                });
        }
        );
        it('finds the cube root of a negative integer', function (done) {
            request.get('/arithmetic?operation=root&operand1=-8&operand2=3')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2 });
                    done();
                });
        }
        );
        it('finds the cube root of a positive floating point number', function (done) {
            request.get('/arithmetic?operation=root&operand1=8.2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2.041241452319315 });
                    done();
                });
        }
        );
        it('finds the cube root of a negative floating point number', function (done) {
            request.get('/arithmetic?operation=root&operand1=-8.2&operand2=3')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.041241452319315 });
                    done();
                });
        }
        );
        it('finds the cube root of a positive integer with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=8&operand2=3.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.8171205928321397 });
                    done();
                });
        }
        );
        it('finds the cube root of a negative integer with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=-8&operand2=3.5')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -1.8171205928321397 });
                    done();
                });
        }
        );
        it('finds the cube root of a positive floating point number with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=8.2&operand2=3.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1.8171205928321397 });
                    done();
                });
        }
        );
        it('finds the cube root of a negative floating point number with a floating point root', function (done) {
            request.get('/arithmetic?operation=root&operand1=-8.2&operand2=3.5')

                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -1.8171205928321397 });
                    done();
                });
        }

        );
    });
    

    describe('Division', function () {
        it('divides a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 21 });
                    done();
                });
        });
        it('divides a negative integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('divides a positive integer by a non-factor', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.5 });
                    done();
                });
        });
        it('divides zero by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
    });

    

    

});
