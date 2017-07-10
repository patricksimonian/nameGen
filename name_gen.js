let fs = require('fs');

class NameGen {
  constructor(fileName, arrayIn, delimiterList, resultLength, minWords, maxWords, maxWordRepeat, numPages) {
    this.result = [];
    this.arrayIn = arrayIn;
    this.delimiterList = delimiterList;
    this.resultLength = resultLength;
    this.maxWordRepeat = maxWordRepeat;
    this.maxWords = maxWords;
    this.minWords = minWords;
    this.generate(this.print);
    this.numPages = numPages;
    this.currentPage = 1;
    this.fileName = fileName;
  }

  roll(odds) {
    let roll = Math.floor(Math.random() * odds);
    return roll
  }

  getRandomWord(phrase) {
    let word, i;
    do {
      i = Math.floor(Math.random() * this.arrayIn.length);
      word = this.arrayIn[i];
      // console.log("word is", word, "phrase is", phrase)
    } while(!this.checkRepeat(word, phrase));
    return this.arrayIn[i];
  }
  getRandomDelim() {
    let i = Math.floor(Math.random() * this.delimiterList.length);
    return this.delimiterList[i];
  }
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
      if(this.result.length % 500 === 0) {
        console.log(this.result.length, " words saved");
      }
    }
    printCB.call(this);
  }
  checkRepeat(word, phrase) {
    let numMatches = 0;
    let re = new RegExp(word, 'g');
    numMatches = phrase.match(re) === null ? 0 : phrase.match(re).length;
    return numMatches < this.maxWordRepeat;
  }
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
//fileName
//
let ng = new NameGen("phrases", words, delim, 5000, 1, 2, 1, 3);
