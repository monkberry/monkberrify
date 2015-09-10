var Monkberry = require('monkberry');
var through = require('through');
var path = require('path');
var fs = require('fs');

function Monkberrify(file) {
  if (/\.(monk|html)$/.test(file)) {
    var data = '', stream = through(write, end);
    return stream;
  } else {
    return through();
  }

  function write(buf, enc, next) {

    var name = path.parse(file).name;
    console.log(file);
    var text = fs.readFileSync(file, {encoding: 'utf8'});
    Monkberry(name, text, {
      normalizeWhitespace: true
    }, function (compiler) {
      data += compiler.compile(true);
    });
  }

  function end() {
    stream.queue(data);
    stream.queue(null);
  }
}

module.exports = Monkberrify;
