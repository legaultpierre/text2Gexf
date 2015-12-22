var fs = require('fs');

var readline = require('readline');
var stream = require('stream');

/*
 * Reads a text file.
 */
var importTextFromFile = exports.importTextFromFile = function(file, callback) {
  var instream = fs.createReadStream(file);
  var outstream = new stream;
  var text = '';
  
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line) {
    text += line;
  });

  rl.on('close', function() {
    callback(text);
  });
}
