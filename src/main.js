import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Deck from "./js/deck.js"

$(document).ready(function() {
  let newDeck = new Deck();
  $("#btn-new-game").click(function(){
    $("#btn-hit").show();
    $("#btn-hold").show();
    let promise = Deck.getDeck();
    promise.then(function(response) {
      newDeck.deckObj = JSON.parse(response);
      getElements(newDeck.deckObj);
      newDeck.startGame();

      for(let i = 0; i < newDeck.playerArray.length; i++){
        $('.showPlayerHand').append(`<img src=${newDeck.playerArray[i].image}>`);
        $('.showDealerHand').append(`<img src=${newDeck.dealerArray[i].image}>`);
      }
      console.log(newDeck.getScore(newDeck.playerArray, newDeck.playerScore));
    })
    $("#btn-hit").click(function(){
      newDeck.hit(newDeck.playerArray);
      newDeck.playerScore = newDeck.getScore(newDeck.playerArray, newDeck.playerScore);
      $('.showPlayerHand').append(`<img src=${newDeck.playerArray[newDeck.playerArray.length-1].image}>`);
      console.log(newDeck.playerScore);
    });
    $("#btn-hold").click(function(){
      newDeck.hold();
      console.log(newDeck.playerHold);
    })
    function getElements(response) {
      console.log("Cards", response);
    }

  });
});

