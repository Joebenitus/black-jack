export default class Deck {
  constructor() {
    this.deckObj;
    this.deckIndex = 0;
    this.playerArray = [];
    this.playerScore = 0;
    this.dealerArray = [];
    this.dealerScore = 0;
    this.playerHold = false;
    this.dealerHold = false;
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
  
  hit(playerToHit) {
    playerToHit.push(this.deckObj.cards[this.deckIndex]);
    this.deckIndex++;
  }

  getScore(player, playerScore) { 
    if (playerScore === 0) {
      for(let i=0; i < player.length; i++) {
        if (parseInt(player[i].value)) { 
          playerScore += parseInt(player[i].value);
        } else if (/(JACK|QUEEN|KING)/.test(player[i].value)) {
          playerScore += 10;
        } else if (player[i].value === "ACE") {
          if (playerScore + 11 <= 21){
            playerScore += 11;
          } else {
            playerScore += 1
          }
        }
      }
    } else {
      if (parseInt(player[player.length-1].value)) { 
        playerScore += parseInt(player[player.length-1].value);
      } else if (/(JACK|QUEEN|KING)/.test(player[player.length-1].value)) {
        playerScore += 10;
      } else if (player[player.length-1].value === "ACE") {
        if (playerScore + 11 <= 21){
          playerScore += 11;
        } else {
          playerScore += 1
        }
      }
    }
    return playerScore;
  }

  startGame(){
    for (this.deckIndex; this.deckIndex < 3; this.deckIndex += 2){
      this.playerArray.push(this.deckObj.cards[this.deckIndex]);
      this.dealerArray.push(this.deckObj.cards[this.deckIndex+1]);
    }
  }

  winCheck(){
    if (this.playerScore === this.dealerScore) {
      alert("It's a draw!");
    } else if(this.playerScore === 21){
      alert("Blackjack, you win!");
    } else if(this.dealerScore === 21){
      alert("Blackjack, dealer wins.");
    } else if(this.dealerScore > 21){
      alert("You win! Dealer busted.");
    } else if (this.playerScore > this.dealerScore){
      alert("Your score is:" + this.playerScore + ", you win!");
    } else if (this.dealerScore > this.playerScore){
      alert("Dealer wins!");
    }
  }

  dealerStays(){
    if (this.dealerScore < 17) {
      return false;
    } else {
      return true;
    }
  }
}