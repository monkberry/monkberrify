var Monkberry = require('monkberry');
var through = require('through');
var convert = require('convert-source-map');
var path = require('path');

function compile(file, data, type, callback) {
  var node;
  try {
    var compiler = new Monkberry.Compiler();
    compiler.addSource(path.basename(file), data, type);
    node = compiler.compile(true);
  } catch (error) {
    callback(error);
    return;
  }

  if (monkberrify.sourceMap) {
    var output = node.toStringWithSourceMap();
    output.map.setSourceContent(file, data);

    var map = convert.fromJSON(output.map.toString());
    callback(null, output.code + '\n' + map.toComment());
  } else {
    callback(null, node.toString());
  }

}

function monkberrify(file) {
  var type = null;

  Object.keys(monkberrify.is).forEach(function (key) {
    if (monkberrify.is[key].test(file)) {
      type = key;
    }
  });

  if (!type) {
    return through();
  }

  var data = '', stream = through(write, end);

  return stream;

  function write(buf) {
    data += buf;
  }

  function end() {
    compile(file, data, type, function (error, result) {
      if (error) stream.emit('error', error);
      stream.queue(result);
      stream.queue(null);
    });
  }
}

monkberrify.compile = compile;
monkberrify.is = {};
monkberrify.is.default = /\.(monk|html)$/;
monkberrify.sourceMap = true;

module.exports = monkberrify;
