var monkberry = require('../lib/compiler');
var through = require('through');
var convert = require('convert-source-map');
var path = require('path');

function compile(file, data, callback) {
  var node, compiler = new monkberry();
  try {
    compiler.addSource(path.parse(file).name, data);
    node = compiler.compile(true);
  } catch (error) {
    callback(error);
    return;
  }

  if (monkberrify.sourceMap) {
    var output = node.toStringWithSourceMap({
      file: file
    });
    var map = convert.fromJSON(output.map);
    map.setProperty('sources', [file]);

    callback(null, output.code + '\n' + map.toComment() + '\n');
  } else {
    callback(null, node.toString() + '\n');
  }

}

function monkberrify(file) {
  if (!monkberrify.isMonkberry.test(file)) {
    return through();
  }

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
monkberrify.isMonkberry = /\.(monk|html)$/;
monkberrify.sourceMap = true;

module.exports = monkberrify;
