var fs = require('fs');
var textAnalyser = require('./textAnalyser');

var initiateGEXF = function(file) {
  var text = '<gexf xmlns="http://www.gexf.net/1.2draft" version="1.2">\n' +
             '  <graph mode="static" defaultedgetype="undirected">\n';
  fs.writeFileSync(file, text);
};

var closeGEXF = function(file) {
  var text = '  </graph>\n' +
             '</gexf>';
  fs.appendFileSync(file, text);
};

var addNodes = function(file, wordsIndex) {
  var text = '    <nodes>\n';
  Object.keys(wordsIndex).forEach(function(word, i) {
    text += '      <node id="' + i + '" label="' + word + '"/>\n';
  });
  text += '    </nodes>\n';
  fs.appendFileSync(file, text);
};

var addEdges = function(file, wordsIndex, couples) {
  var text = '    <edges>\n';
  var index = 0;
  var words = Object.keys(wordsIndex);
  Object.keys(couples).forEach(function(word1) {

    var coupleData = couples[word1];
    var indexWord1 = words.indexOf(word1);

    Object.keys(coupleData).forEach(function(word2) {
      var indexWord2 = words.indexOf(word2);
      text += '      <edge id="' + index + '" '+
                          'source="' + indexWord1 + '" ' +
                          'target="' + indexWord2 + '" ' +
                          'weight="' + coupleData[word2] + '"/>\n';
      index++;
    });

  });
  text += '    </edges>\n';
  fs.appendFileSync(file, text);
};

/*
 * Creates the GEXF file
 */
var writeGEXF = exports.writeGEXF = function(file, wordsIndex, sentenceIndex) {
  var couples = textAnalyser.getCouplesOfWords(wordsIndex, sentenceIndex);

  initiateGEXF(file);
  addNodes(file, wordsIndex);
  addEdges(file, wordsIndex, couples);
  closeGEXF(file);
};
