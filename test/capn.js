// Testing modules
var chai = require('chai');
var expect = chai.expect;
var testUtils = require('./lib/utils')(module.filename);

// Import the module we're testing
var Capn = require(testUtils.pathToLib);

// One describe for the entire module
describe(testUtils.testName, function(){
  // One describe for each method
  describe('stack', function(){
    // An it for each aspect of the method
    it(shouldBe('an array'), function(){
      expect(Capn.stack).to.be.an('array');
    });
  });

  describe('line', function(){
    it(shouldBe('a number'), function(){
      expect(Capn.line).to.be.a('number');
    });

    it(shouldReturn('the line number that it was called on'), function(){
      var nextLine = Capn.line + 1;
      expect(Capn.line).to.eq(nextLine);
    });
  });

  describe('typeName', function(){
    var Foo;

    beforeEach(function(){
      Foo = function Foo(){};
    });

    afterEach(function(){
      Foo = null;
    });

    it(shouldBe('a string'), function(){
      expect(Capn.typeName).to.be.a('string');
    });

    it(shouldBe('equal to constructor name of its context'), function(){
      Foo.prototype.bar = function(){ return Capn.typeName; };
      var foo = new Foo();
      expect(foo.bar()).to.eq('Foo');
    });
  });
});
