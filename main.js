var textAnalyser = require('./textAnalyser'),
    gexfExport = require('./gexfExport'),
    importText = require('./importText');

// Loads the text file
importText.importTextFromFile('./example/example.txt', function(text) {
  var wordIndex = {},
      sentenceIndex = {};

  // Run the analysis and stores the info into wordIndex and sentenceIndex
  textAnalyser.analyseText('en', text, wordIndex, sentenceIndex, function() {

    //Creates a GEXF
    gexfExport.writeGEXF('./example/example.gexf', wordIndex, sentenceIndex);

  });

});


