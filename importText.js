var fs = require('fs');

var readline = require('readline');
var stream = require('stream');

var importTextFromFile = exports.importTextFromFile = function(file, callback) {
  var instream = fs.createReadStream(file);
  var outstream = new stream;
  var text = '';
  
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line) {
    line = line.toLowerCase();
    text += line;
  });

  rl.on('close', function() {
    callback(text);
  });
}
