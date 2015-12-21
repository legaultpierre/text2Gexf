var fs = require('fs');

var readline = require('readline');
var stream = require('stream');

var importStopWords = exports.importStopWords = function(file, index, callback) {
  var instream = fs.createReadStream(file);
  var outstream = new stream;
  
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line) {
    if (index[line] === undefined) {
      index[line] = 1;
    }
  });

  rl.on('close', function() {
    callback(index)
  });
}
