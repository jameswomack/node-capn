var path = require('path');

var protoExtendWithModule = function(Prototype, o){
  Object.keys(o).forEach(function(key){
    if(!Prototype.hasOwnProperty(key)) {
      Object.defineProperty(Prototype, key, {
        get: function(){
          return o[key](this);
        }
      });
    }
  });
};

protoExtendWithModule(String.prototype, path);

global.should = function(message){
  return 'should ' + message;
};
global.shouldReturn = function(message){
  return should('return ' + message);
};
global.shouldBe = function(message){
  return should('be ' + message);
};

console.inspect = function(o){
  var util = require('util');
  var output = util.inspect(o, {colors: true, showHidden: true, depth: 4});
  util.debug(output);
};

// require i with String.prototype extensions
require('i')(true);

function Test(filename){
  var name = filename.basename.replace(filename.extname,'');
  this.pathToLib = filename.replace('test','lib').replace(filename.extname,'');
  this.testName = name.titleize;
}

Test.prototype.decorate = function(message){
  return '[' + this.testName + '] ' + message;
};

Test.prototype.log = function(){
  console.log(this.decorate(arguments[0]));
};

module.exports = function(filename){
  return new Test(filename);
};
