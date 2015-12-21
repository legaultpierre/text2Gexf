var wordIndex = {},
    sentenceIndex = {};

var lowerText = exports.lowerText = function(string) {
  return string.toLowerCase();
}

var segmentBySentence = exports.segmentBySentence = function(string) {
  var re = /(\.+|\?)\s/;
  var reLast = /(\.|\?)$/;
  string = string.replace(reLast, '');

  return string.split(re);
}

var segmentSentenceByWords = exports.segmentSentenceByWords = function(string) {
  // TODO: add here to remove commas, semi colons...
  string = string.trim();
  var re = /\s+/;
  return string.split(re);
}

var linkWordsOfSentence = exports.linkWordsOfSentence = function(sentence) {
  //Here we are going to create an index for every word, and stores it
  
  //ID for the sentence
  var sentenceID = sentence;
  var arrayOfWords = segmentSentenceByWords(sentence);

  arrayOfWords.forEach(function(word) {
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
  });
}

var linkWordsOfText = exports.linkWordsOfText = function(text) {
  text = lowerText(text);
  var sentences = segmentBySentence(text);
  sentences.forEach(function(sentence) {
    linkWordsOfSentence(sentence);
  });
}

var findLinkedWords = exports.findLinkedWords = function(word) {
  var wordElement = wordIndex[word];
  console.log(wordElement)
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


linkWordsOfText('Hey you. How are you doing? I love potatoes and you? You love dogs');
console.log(wordIndex);
console.log();
console.log(sentenceIndex);
console.log();
console.log(findLinkedWords('doing'));
