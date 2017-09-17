let fs = require('fs');
//NameGen creates a text file that is populated with a list of
//generated words based on seed data passed into the constructor
//confirmation via console.logs are given

// constructor: 
// -name of filename (.txt will be appened)
// -seedwords, an array of strings that will be used my mixing and matching
//  to generate new words
// -delimiterList, an array of strings that will be used as the joining character between words (ie: spaces, no spaces, commas etc)
// -resultLength is an integer of the number of words to generate
// -minWords is the minimum number of words to join together during generation
// -maxwords is the maximum number of words to join together during generation
// -maxwordsRepeat is the maximum number of times a single word can be repeated in a generated word
// -number of pages to generate
// -maximum amount of words on a page before another one is created

class NameGen {
  constructor(fileName, seedWords, delimiterList, resultLength, minWords, maxWords, maxWordRepeat, numPages, maxWordsOnPage = 500) {
   //result array of gen words
    this.result = [];
    this.seedWords = seedWords;
    this.delimiterList = delimiterList;
    this.resultLength = resultLength;
    this.maxWordRepeat = maxWordRepeat;
    this.maxWords = maxWords;
    this.minWords = minWords;
    this.maxWordsOnPage = maxWordsOnPage;
    this.generate(this.print);
    this.numPages = numPages;
    this.currentPage = 1;
    this.fileName = fileName;
  }
 //simulated diceroll
  roll(odds) {
    let roll = Math.floor(Math.random() * odds);
    return roll
  }
  //get a random word from the seedlist
  //loop and get another random word if this one exceed the max
  //amount of repeats
  getRandomWord(phrase) {
    let word, i;
    do {
      i = Math.floor(Math.random() * this.seedWords.length);
      word = this.seedWords[i];
      // console.log("word is", word, "phrase is", phrase)
    } while(!this.checkRepeat(word, phrase));
    return word;
  }
 
  getRandomDelim() {
    let i = Math.floor(Math.random() * this.delimiterList.length);
    return this.delimiterList[i];
  }
  //main function to create random words and join them as phrases
 //after a phrase is generated push it into the result array
 //if the result array limit is reached, printing beings
 //printing is done in 500 phrase chunks so that they are more manageable
  generate(printCB) {
    while(this.result.length < this.resultLength) {
      let phrase = '';
      for(let i = Math.floor(Math.random() * this.minWords); i < this.maxWords; i++) {
        phrase += this.getRandomWord(phrase);
        let delimObj = this.getRandomDelim();
        if(this.roll(delimObj.odds) === this.roll(delimObj.odds)) {
          phrase += delimObj.delim;
        }
      }
      this.result.push(phrase);
      if(this.result.length % this.maxWordsOnPage  === 0) {
        console.log(this.result.length, " words saved");
      }
    }
    printCB.call(this);
  }
  //return boolean based on if the word is repeated more then that allotted limit
// inside the phrase
  checkRepeat(word, phrase) {
    let numMatches = 0;
    let re = new RegExp(word, 'g');
    numMatches = phrase.match(re) === null ? 0 : phrase.match(re).length;
    return numMatches < this.maxWordRepeat;
  }
//node function to print data to a file by joining the result array by a newline
  print() {
    fs.writeFile(this.fileName + this.currentPage + '.txt', this.result.join('\n'), (err) => {
      if(err) {
        console.log("oh fuck")
      } else {
        console.log("complete print of ", this.resultLength, " words! to " + this.fileName + this.currentPage);
        if(this.currentPage < this.numPages) {
          this.currentPage ++;
          this.generate(this.print);
        }
      }
    });
  }
}

let words = ["bio", "luma", "life", "sense", "essence"];
let delim = [{delim: "", odds: 4}, {delim: " ", odds: 2}];

let ng = new NameGen("phrases", words, delim, 5000, 1, 2, 1, 3);
