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

  describe(' with empty index', function() {
    it('should work with one occurence of word in sentence', function() {
      var sentence = 'hello you',
          wordIndex = {},
          sentenceIndex = {};
      var resultWordIndex = {
        'hello': {
          sentences: {
            'hello you': 1
          }
        },
        'you': {
          sentences: {
            'hello you': 1
          }
        }
      };
      var resultSentenceIndex = {
        'hello you': {
          'hello': 1,
          'you': 1
        }
      };
      textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
      assert.deepEqual(wordIndex, resultWordIndex);
      assert.deepEqual(sentenceIndex, resultSentenceIndex);
    });

    it('should work with two occurences of a word in sentence', function() {
      var sentence = 'you hello you',
          wordIndex = {},
          sentenceIndex = {};
      var resultWordIndex = {
        'hello': {
          sentences: {
            'you hello you': 1
          }
        },
        'you': {
          sentences: {
            'you hello you': 2
          }
        }
      };
      var resultSentenceIndex = {
        'you hello you': {
          'hello': 1,
          'you': 2
        }
      };
      textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
      assert.deepEqual(wordIndex, resultWordIndex);
      assert.deepEqual(sentenceIndex, resultSentenceIndex);
    });
  });

  describe(' with non-empty index', function() {
    describe(' only not pre-existing words', function() {
      it('should work with one occurence of word in sentence', function() {
        var sentence = 'hello you',
            wordIndex = {
              'i': {
                sentences: {
                  'i love me': 1
                }
              },
              'love': {
                sentences: {
                  'i love me': 1
                }
              },
              'me': {
                sentences: {
                  'i love me': 1
                }
              },
            },
            sentenceIndex = {
              'i love me': {
                'i': 1,
                'love': 1,
                'me': 1
              }
            };
        var resultWordIndex = {
          'i': {
              sentences: {
                'i love me': 1
              }
          },
          'love': {
            sentences: {
              'i love me': 1
            }
          },
          'me': {
            sentences: {
              'i love me': 1
            }
          },
          'hello': {
            sentences: {
              'hello you': 1
            },
          },
          'you': {
            sentences: {
              'hello you': 1
            }
          }
        };
        var resultSentenceIndex = {
          'hello you': {
            'hello': 1,
            'you': 1
          },
          'i love me': {
            'i': 1,
            'love': 1,
            'me': 1
          }
        };
        textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
        assert.deepEqual(wordIndex, resultWordIndex);
        assert.deepEqual(sentenceIndex, resultSentenceIndex);
      });

      it('should work with two occurences of a word in sentence', function() {
        var sentence = 'you hello you',
            wordIndex = {
              'i': {
                sentences: {
                  'i love me': 1
                }
              },
              'love': {
                sentences: {
                  'i love me': 1
                }
              },
              'me': {
                sentences: {
                  'i love me': 1
                }
              },
            },
            sentenceIndex = {
              'i love me': {
                'i': 1,
                'love': 1,
                'me': 1
              }
            };
        var resultWordIndex = {
          'i': {
              sentences: {
                'i love me': 1
              }
          },
          'love': {
            sentences: {
              'i love me': 1
            }
          },
          'me': {
            sentences: {
              'i love me': 1
            }
          },
          'hello': {
            sentences: {
              'you hello you': 1
            }
          },
          'you': {
            sentences: {
              'you hello you': 2
            }
          }
        };
        var resultSentenceIndex = {
          'you hello you': {
            'hello': 1,
            'you': 2
          },
          'i love me': {
            'i': 1,
            'love': 1,
            'me': 1
          }
        };
        textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
        assert.deepEqual(wordIndex, resultWordIndex);
        assert.deepEqual(sentenceIndex, resultSentenceIndex);
      });
    });
    describe(' with pre-existing words', function() {
      it('should work with one occurence of word in sentence', function() {
        var sentence = 'hello you i',
            wordIndex = {
              'i': {
                sentences: {
                  'i love me': 1
                }
              },
              'love': {
                sentences: {
                  'i love me': 1
                }
              },
              'me': {
                sentences: {
                  'i love me': 1
                }
              },
            },
            sentenceIndex = {
              'i love me': {
                'i': 1,
                'love': 1,
                'me': 1
              }
            };
        var resultWordIndex = {
          'i': {
              sentences: {
                'i love me': 1,
                'hello you i': 1,
              }
          },
          'love': {
            sentences: {
              'i love me': 1
            }
          },
          'me': {
            sentences: {
              'i love me': 1
            }
          },
          'hello': {
            sentences: {
              'hello you i': 1
            },
          },
          'you': {
            sentences: {
              'hello you i': 1
            }
          }
        };
        var resultSentenceIndex = {
          'hello you i': {
            'hello': 1,
            'you': 1,
            'i': 1
          },
          'i love me': {
            'i': 1,
            'love': 1,
            'me': 1
          }
        };
        textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
        assert.deepEqual(wordIndex, resultWordIndex);
        assert.deepEqual(sentenceIndex, resultSentenceIndex);
      });

      it('should work with two occurences of a word in sentence', function() {
        var sentence = 'hello i you i',
            wordIndex = {
              'i': {
                sentences: {
                  'i love me': 1
                }
              },
              'love': {
                sentences: {
                  'i love me': 1
                }
              },
              'me': {
                sentences: {
                  'i love me': 1
                }
              },
            },
            sentenceIndex = {
              'i love me': {
                'i': 1,
                'love': 1,
                'me': 1
              }
            };
        var resultWordIndex = {
          'i': {
              sentences: {
                'i love me': 1,
                'hello i you i': 2,
              }
          },
          'love': {
            sentences: {
              'i love me': 1
            }
          },
          'me': {
            sentences: {
              'i love me': 1
            }
          },
          'hello': {
            sentences: {
              'hello i you i': 1
            },
          },
          'you': {
            sentences: {
              'hello i you i': 1
            }
          }
        };
        var resultSentenceIndex = {
          'hello i you i': {
            'hello': 1,
            'you': 1,
            'i': 2
          },
          'i love me': {
            'i': 1,
            'love': 1,
            'me': 1
          }
        };
        textAnalyser.linkWordsOfSentence(sentence, wordIndex, sentenceIndex)
        assert.deepEqual(wordIndex, resultWordIndex);
        assert.deepEqual(sentenceIndex, resultSentenceIndex);
      });
    });

  });
});

describe('findLinkedWords', function() {
  var wordIndex = {
    'i': {
        sentences: {
          'i love me': 1,
          'hello i you i': 2,
        }
    },
    'love': {
      sentences: {
        'i love me': 1
      }
    },
    'me': {
      sentences: {
        'i love me': 1
      }
    },
    'hello': {
      sentences: {
        'hello i you i': 1
      },
    },
    'you': {
      sentences: {
        'hello i you i': 1
      }
    }
  };
  var sentenceIndex = {
    'hello i you i': {
      'hello': 1,
      'you': 1,
      'i': 2
    },
    'i love me': {
      'i': 1,
      'love': 1,
      'me': 1
    }
  };
  it('should work with non present word', function() {
    assert.deepEqual(textAnalyser.findLinkedWords('toto', wordIndex, sentenceIndex), {});
  });
  it('should work with one-sentence word', function() {
    assert.deepEqual(textAnalyser.findLinkedWords('love', wordIndex, sentenceIndex),
      {
        'i': 1,
        'me': 1
      });
  });
  it('should work with multiple-sentence word', function() {
    assert.deepEqual(textAnalyser.findLinkedWords('i', wordIndex, sentenceIndex),
      {
        'hello': 1,
        'you': 1,
        'love': 1,
        'me': 1
      });
  });
});

describe('getCouplesOfWords', function() {
});
