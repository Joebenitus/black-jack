import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Deck from "./js/deck.js"

$(document).ready(function() {
  // let newDeck = new Deck();
  let deckObj;
  let deckIndex = 0;
  let playerArray = [];
  let dealerArray = [];
  $("#btn-new-game").click(function(){
    $("#btn-hit").show();
    let promise = Deck.getDeck();
    promise.then(function(response) {
      deckObj = JSON.parse(response);
      getElements(deckObj);
      for (deckIndex; deckIndex < 3; deckIndex += 2){
        playerArray.push(deckObj.cards[deckIndex]);
        dealerArray.push(deckObj.cards[deckIndex+1]);
        console.log("player", playerArray);
        console.log("dealer", dealerArray);
      }
    })
    $("#btn-hit").click(function(){
      playerArray.push(deckObj.cards[deckIndex]);
      deckIndex++;
      dealerArray.push(deckObj.cards[deckIndex]);
      deckIndex++;
      console.log(playerArray);
      console.log(dealerArray);
    });

    function getElements(response) {
      console.log("Cards", response);
    }

  });
});

