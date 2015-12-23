var assert = require('assert');
var textAnalyser = require('../textAnalyser.js');

describe('segmentBySentence', function() {
  describe('delimited by point.', function() {
    var oneSentence = 'Hello you.',
        twoSentences1 = 'Hello you. You\'re beautiful',
        twoSentences2 = 'Hello you. You\'re beautiful.',
        threeSentences = 'Hello you. You\'re beautiful. Do you love me.';
    it('should return 1 sentence', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(oneSentence),
                      ['Hello you']);
    });
    it('should return 2 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(twoSentences1),
                      ['Hello you', '.', 'You\'re beautiful']);
    });
    it('should return 2 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(twoSentences2),
                      ['Hello you', '.', 'You\'re beautiful']);
    });
    it('should return 3 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(threeSentences),
                      ['Hello you', '.', 'You\'re beautiful', '.', 'Do you love me']);
    });
  })
  describe('delimited by interrogation mark.', function() {
    var oneSentence = 'Hello you?',
        twoSentences1 = 'Hello you? You\'re beautiful',
        twoSentences2 = 'Hello you? You\'re beautiful?',
        threeSentences = 'Hello you? You\'re beautiful? Do you love me?';
    it('should return 1 sentence', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(oneSentence),
                      ['Hello you']);
    });
    it('should return 2 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(twoSentences1),
                      ['Hello you', '?', 'You\'re beautiful']);
    });
    it('should return 2 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(twoSentences2),
                      ['Hello you', '?', 'You\'re beautiful']);
    });
    it('should return 3 sentences', function() {
      assert.deepEqual(textAnalyser.segmentBySentence(threeSentences),
                      ['Hello you', '?', 'You\'re beautiful', '?', 'Do you love me']);
    });
  })
});

describe('segmentSentenceByWords', function() {
  var sentence1 = 'Hey',
      sentence2 = 'Hey you',
      sentence3 = 'Hey  you how',
      sentence4 = '  Hey  you how     ';
  it('should return 1 word', function() {
    assert.deepEqual(textAnalyser.segmentSentenceByWords(sentence1),
                     ['Hey']);
  });
  it('should return 2 words', function() {
    assert.deepEqual(textAnalyser.segmentSentenceByWords(sentence2),
                     ['Hey', 'you']);
  });
  it('should return 3 words', function() {
    assert.deepEqual(textAnalyser.segmentSentenceByWords(sentence3),
                     ['Hey', 'you', 'how']);
  });
  it('should return 3 words', function() {
    assert.deepEqual(textAnalyser.segmentSentenceByWords(sentence4),
                     ['Hey', 'you', 'how']);
  });
});

describe('linkWordsOfSentence', function() {
});

describe('linkWordsOfText', function() {
});

describe('loadStopWords', function() {
});

describe('findLinkedWords', function() {
});

describe('getCouplesOfWords', function() {
});

describe('analyseText', function() {
});
