/*
 * Create a list that holds all of your cards
 */
const deckOfCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube','fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

const deck = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];

//shuffle card before creating board
//shuffle(deckOfCards);

//initialize game
function init () {
  //create the board and place cards on top
  for (let i=0; i<deckOfCards.length; i++) {
     const card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class="fa ${deckOfCards[i]}"></i>`;
     deck.appendChild(card);

     //run clickedCard function to add click event listener
     clickedCard(card);
   }
}

function clickedCard  (card) {
  //loop through array to add click event Listener to each card
  card.addEventListener('click', function() {
      const currentCard = this;
      const firstCard = openCards[0];
      //flip openCard
      if (openCards.length ===1 ) {

        card.classList.add('open','show');
        openCards.push(this);
          if (currentCard.innerHTML === firstCard.innerHTML) {

            currentCard.classList.add('match');
            firstCard.classList.add('match');
            //if match push the two match cards into this array
            matchedCards.push(currentCard, firstCard);
            //reset the arrays
            openCards = [];

            //check if game is finished
            gameOver();

          } else {
            //flip it back
            setTimeout ( function() {
              currentCard.classList.remove('open', 'show', 'disable');
              firstCard.classList.remove('open', 'show', 'disable');
            }, 1000);
            //reset the arrays
            openCards = [];

            //add new moves


            }
          } else {
            //flip card
            currentCard.classList.add('open', 'show','disable');
            openCards.push(this);
            //start counter
            addMove();
            rating();

          }

      });
  }

function gameOver () {
    //game is over when the cards that are stored in the matched array equal total amount of cards in the deck
    if (matchedCards.length === deckOfCards.length) {
        console.log("Game won")
        stopClock ();
        //showModal();
        //toggleModal();
    }
}

const moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = 0;

function addMove () {
  //each move means opening 2 cards that match or doesn't match
  moves++;
  moveCounter.innerHTML = moves;
}

let starList = document.querySelectorAll('.fa-star');

function rating () {
  // keeps track of moves and deducts a star when reaches 10 or 20 moves
  if (moves === 2 || moves === 10) {

    for (let i=0; i < starList.length; i++) {
        starList[0].remove();
    }
  } else {
    starList ="";
    starList = document.querySelectorAll('.fa-star');
  }
}

let starContainer = document.querySelector('.stars');

function restartRating () {
  let starContainer =  document.querySelector('.stars').children;
  for (let i=0; i < 2; i++) {
      starContainer[i].classList.add('fa', 'fa-star');
  }
}
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  deck.innerHTML = "";
  init();
  moves = 0;
  restartRating();
  stopClock ();
  moveCounter.innerHTML = moves;


});


init();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let clockOff = true;
let time = 0;
let clockID;
let timer = 0;

let minutes;
let seconds;

//create a timer
function startClock() {
let  time = setInterval(function() {
    time++;
    minutes = Math.floor(time/60);
    seconds = time % 60;

    displayTime();
  }, 1000);
}



function displayTime() {
  let timer = document.querySelector('.time');
  if (seconds < 10) {
      timer.innerHTML=`${minutes}:0${seconds}`;
  } else {
      timer.innerHTML=`${minutes}:${seconds}`;
    }
}

function stopClock () {
  clearInterval(time);

}




  //restart game
  function restartGame() {
    var restartBtn = document.querySelector('.fa-repeat');
    restartBtn.addEventListener('click', function (event) {

        console.log(restartBtn);
      });
    /*    resetTime();
    deck.innerHTML = "";

     //  init();
      matchedCards = [];
      moves = 0;
      moveCounter.innerHTML = moves;
      starsCounter.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    });*/
  }





  /*function startTimer () {
    let time = setInterval(countTimer, 1000);
    var totalSecon
    interval = setInterval (function() {
      time++;
      minute = Math.floor(time /60);
      second = time - minute * 60;

      displayTime();

    },1000);
  }*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
