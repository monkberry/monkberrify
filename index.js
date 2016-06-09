var Compiler = require('monkberry').Compiler;
var through = require('through');
var convert = require('convert-source-map');
var path = require('path');

function compile(file, data, callback) {
  var node;
  try {
    var compiler = new Compiler();

    if (monkberrify.globals) {
      compiler.globals = monkberrify.globals;
    }

    node = compiler.compile(path.basename(file), data);
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
  var data = '', stream = through(write, end);

  return stream;

  function write(buf) {
    data += buf;
  }

  function end() {
    compile(file, data, function (error, result) {
      if (error) stream.emit('error', error);
      stream.queue(result);
      stream.queue(null);
    });
  }
}

monkberrify.compile = compile;
monkberrify.globals = [];

module.exports = monkberrify;
