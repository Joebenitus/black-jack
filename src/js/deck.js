export default class Deck {
  constructor() {
    this.deckObj;
    this.deckIndex = 0;
    this.playerArray = [];
    this.playerTotal = 0;
    this.dealerArray = [];
    this.dealerTotal = 0;
  }

  static getDeck() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const urlNewDeck = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", urlNewDeck, true);
      request.send();
    });
  }
  
  draw() {
    // this.playerArray.push(this.deckObj.cards[this.deckIndex].code);
    // this.deckIndex++;
    // this.dealerArray.push(this.deckObj.cards[this.deckIndex].code);
    // this.deckIndex++;
    // console.log(this.playerArray);
    // console.log(this.dealerArray);
  }

  getScore() {
    let playerScore = 0;
    
    for(let i=0; i < this.playerArray.length; i++) {
      if (parseInt(this.playerArray[i].value)) { 
        return playerScore + parseInt(this.playerArray[i].value);
      } //else if (this.playerArray[i].value.match(/(JACK|QUEEN|KING)/)) {
        
     // }
    }
  }
}

///(JACK|QUEEN|KING)/
