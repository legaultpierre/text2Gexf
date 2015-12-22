var stopWordsLoader = require('./stopWordsLoader'),
    utils = require('./utils');

var stopWordsIndex = {};

/*
 * Splits a string into sentences.
 */
var segmentBySentence = exports.segmentBySentence = function(string) {
  var re = /(\.+|\?)(?!\d+)\s*/;
  var reLast = /(\.|\?)$/;
  string = string.replace(reLast, '');

  return string.split(re);
}

/*
 * Splits a string into words.
 */
var segmentSentenceByWords = exports.segmentSentenceByWords = function(string) {
  string = string.trim();
  var re = /\s+/;
  return string.split(re);
}

/*
 * Stores:
 *   - for each word, every sentence it's in. (in wordIndex)
 *   - for each sentence, every word in it. (in sentenceIndex)
 */
var linkWordsOfSentence =
  exports.linkWordsOfSentence = function(sentence, wordIndex, sentenceIndex) {  
  //ID of the sentence
  var sentenceID = sentence;

  var arrayOfWords = segmentSentenceByWords(sentence);

  arrayOfWords.forEach(function(word) {
    if (stopWordsIndex[word] === undefined) {
      // Builds the word index that for each word stores its sentences
      if (wordIndex[word] === undefined) {
        wordIndex[word] = {
          sentences: {}
        };
      }
      if (wordIndex[word].sentences[sentenceID] === undefined) {
        wordIndex[word].sentences[sentenceID] = 1;
      }
      else {
        wordIndex[word].sentences[sentenceID]++;
      }

      // Builds the sentence index that stores for each sentence its words
      if (sentenceIndex[sentenceID] === undefined) {
        sentenceIndex[sentenceID] = {};
      }
      if (sentenceIndex[sentenceID][word] === undefined) {
        sentenceIndex[sentenceID][word] = 1;
      }
      else {
        sentenceIndex[sentenceID][word]++;
      }
    }
  });
}

/*
 * Index all words/sentences of the given text
 */
var linkWordsOfText =
  exports.linkWordsOfText = function(text, wordIndex, sentenceIndex) {

  text = utils.lowerText(text);
  var sentences = segmentBySentence(text);
  sentences.forEach(function(sentence) {
    linkWordsOfSentence(sentence, wordIndex, sentenceIndex);
  });
}

/*
 * Load the stop words corresponding to the given language
 */
var loadStopWords = exports.loadStopWords = function(language, callback) {
  var files = [];
  files.push('./stopWords/' + language + '.txt');

  stopWordsLoader.importStopWords(files, stopWordsIndex, function() {
    // stopWordsIndex = e;
    callback();
  });
}

/*
 * Returns the associated words of a given word
 */
var findLinkedWords = 
  exports.findLinkedWords = function(word, wordIndex, sentenceIndex) {

  var wordElement = wordIndex[word];
  var linkedWords = {};
  if (wordElement === undefined) {
    return linkedWords;
  }
  else {
    // Gets all the sentences in which this word appears
    Object.keys(wordElement.sentences).forEach(function(sentence) {
      var sentenceData = sentenceIndex[sentence];
      // Gets every word in this sentence data
      Object.keys(sentenceData).forEach(function(w) {
        if (w !== word) {
          if (linkedWords[w] === undefined) {
            linkedWords[w] = sentenceData[w];
          }
          else {
            linkedWords[w] += sentenceData[w];
          }
        }
      });
    });

    return linkedWords;
  }
}

/*
 * Returns all the words associations.
 */
var getCouplesOfWords =
  exports.getCouplesOfWords = function(wordIndex, sentenceIndex) {

  var couples = {};
  Object.keys(wordIndex).forEach(function(word, i, a) {

    var linked = findLinkedWords(word, wordIndex, sentenceIndex);

    Object.keys(linked).forEach(function(link) {
      if (a.indexOf(link) > i) {
        if (couples[word] === undefined) {
          couples[word] = {};
          couples[word][link] = linked[link];
        }
        else if (couples[word][link] === undefined) {
          couples[word][link] = linked[link];
        }
        else {
          couples[word][link] += linked[link];
        }
      }
    });
  });
  return couples;
}

/*
 * Loads the stop words.
 * Index the words of the text.
 * Does an GEXF network
 */
var analyseText =
  exports.analyseText = function(language, text, wordIndex, sentenceIndex, callback) {
  
  loadStopWords(language, function() {
    text = utils.cleanText(text);
    linkWordsOfText(text, wordIndex, sentenceIndex);
    callback();
  });
}
