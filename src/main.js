import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Deck from "./js/deck.js"

$(document).ready(function() {
  let newDeck = new Deck();
  $("#btn-play").click(function(){
    $("#btn-hit").show();
    $("#btn-hold").show();
    $("#btn-play").hide();
    let promise = Deck.getDeck();
    promise.then(function(response) {
      newDeck.deckObj = JSON.parse(response);
      newDeck.startGame();

      for(let i = 0; i < newDeck.playerArray.length; i++){
        $('.showPlayerHand').append(`<img src=${newDeck.playerArray[i].image}>`);
      }
      $('.showDealerHand').append(`<img src="./../assets/images/card-back.png" id="flipped-card">`);
      $('.showDealerHand').append(`<img src=${newDeck.dealerArray[1].image}>`);
      newDeck.playerScore = newDeck.getScore(newDeck.playerArray, newDeck.playerScore);
      newDeck.dealerScore = newDeck.getScore(newDeck.dealerArray, newDeck.dealerScore);
      $('.player-score').text(`Score: ${newDeck.playerScore}`);
    })
    $("#btn-hit").click(function(){
      newDeck.hit(newDeck.playerArray);
      newDeck.playerScore = newDeck.getScore(newDeck.playerArray, newDeck.playerScore);
      $('.player-score').text(`Score: ${newDeck.playerScore}`);
      $('.showPlayerHand').append(`<img src=${newDeck.playerArray[newDeck.playerArray.length-1].image}>`);
      if (newDeck.playerScore > 21) {
        $('.bust').text("You bust! Game over :(");
        $("#btn-home").show();
      }
    });
    $("#btn-hold").click(function(){
      while (newDeck.dealerStays() === false) {
        newDeck.hit(newDeck.dealerArray);
        newDeck.dealerScore = newDeck.getScore(newDeck.dealerArray, newDeck.dealerScore);
        $('.showDealerHand').append(`<img src=${newDeck.dealerArray[newDeck.dealerArray.length-1].image}>`);
      }
      $('#flipped-card').attr("src", newDeck.dealerArray[0].image);
      newDeck.winCheck();
      $("#btn-home").show();
    })
  });
});

