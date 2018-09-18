/*
 * Create a list that holds all of your cards
 */
const deckOfCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube','fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

const deck = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
let clockOff = true;
let time = 0;
let clockId;
let timer = 0;

//initialize game
function init () {
  shuffle(deckOfCards);
  resetMatched();
  resetClock();
  //create the board and place cards on top
  for (let i = 0; i < deckOfCards.length; i++) {
     const card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class="fa ${deckOfCards[i]}"></i>`;
     deck.appendChild(card);
     //run clickedCard function to add click event listener
     clickedCard(card);
   }
}

function clickedCard(card) {
  //loop through array to add click event Listener to each card
  card.addEventListener('click', function() {
      if (clockOff) {
          startClock();
          clockOff = false;
      }
      const currentCard = this;
      const firstCard = openCards[0];
      //HAS A CARD
      if (openCards.length === 1 ) {
            card.classList.add('open','show', 'disable');
            openCards.push(this);
            //COMPARE TWO OPENED CARDS
            compareCards(currentCard, firstCard);
      } else {
            //NO OPEN CARD
            currentCard.classList.add('open', 'show','disable');
            openCards.push(this);
            //start counter
            addMove();
        }
  });
}

function compareCards(currentCard, firstCard) {
  //compare the cards to see if there is a match
  if (currentCard.innerHTML === firstCard.innerHTML) {
        console.log("matches");
        currentCard.classList.add('match');
        firstCard.classList.add('match');
        //if matched push the two matched cards into the array
        matchedCards.push(currentCard, firstCard);
        //reset the openCards arrays
        openCards = [];

        //check if game is finished by seeing if all cards are matched
        if (matchedCards.length === deckOfCards.length) {
          gameOver();
        }
  } else {
        //flip it back
        //DOESNT MATCH
        console.log("doesn't match")
        setTimeout (function() {
            currentCard.classList.remove('open', 'show', 'disable');
            firstCard.classList.remove('open', 'show', 'disable');
        }, 500);
          //reset the openCards arrays
          openCards = [];
    }
}


function gameOver () {
    //game is over when the cards that are stored in the matched array equal total amount of cards in the deck
    console.log("Game Over");
    stopClock();
    toggleModal();
}


// Add Moves
const moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = 0;

function addMove () {
  //each move means opening 2 cards that match or doesn't match
  moves++;
  moveCounter.innerHTML = moves;
  rating();
}

// Add Rating
let starList = document.querySelector('.stars');
const aStar = `<li><i class="fa fa-star"></i></li>`;
starList.innerHTML = aStar + aStar + aStar;

function rating() {
  if(moves < 15) {
    starList.innerHTML = aStar + aStar + aStar;
  } else if(moves <20) {
    starList.innerHTML = aStar + aStar;
  } else {
    starList.innerHTML = aStar;
  }
}

//shuffle cards
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

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

// Add timer
function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  let timer = document.querySelector('.time');
  timer.innerHTML = time;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10 ){
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
}

function stopClock () {
  clearInterval(clockId);
}


//reset Timer
function resetClock () {
  stopClock();
  time = 0;
  clockOff = true;
  displayTime();
}

//restart rating to 3 stars
let starContainer = document.querySelector('.stars');
let defaultStar = document.querySelector('.stars').children;

function restartRating () {
  starList.innerHTML = aStar + aStar + aStar;
}

//reset moves to 0
function resetMoves() {
  moves = 0;
  moveCounter.innerHTML = moves;
}


//trigger modal when game is finished
function showModal() {
      const timeStat = document.querySelector('.modal_time');
      const clockTime = document.querySelector('.time').innerHTML;
      const movesStat = document.querySelector('.modal_moves');
      const starsStat = document.querySelector('.modal_stars');

      let finalTime = time;
      let finalMove = moves;
      let finalStar = [];

      if (finalMove >= 25 ) {
        starsStat.innerHTML = '<i class="fa fa-star"></i>';
      } else if (finalMove >= 15) {
          starsStat.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
      } else  { starsStat.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';}

      timeStat.innerHTML = `Time = ${finalTime} seconds`;
      movesStat.innerHTML = `Moves = ${finalMove}`;
}

function toggleModal() {
  let modal = document.querySelector('.modal_body');
  let modalOverlay = document.querySelector('.modal-overlay');
  modal.classList.toggle('hide');
  modalOverlay.classList.toggle ('hide');
  showModal();
}

//replay game
document.querySelector('.modal_replay').addEventListener('click', replayGame);

//restart button to trigger restart of game
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function() {
      deck.innerHTML = "";
      restartGame();
      init();
      //  moves = 0; //restart moves to 0
      //moveCounter.innerHTML = moves;
  });


function replayGame() {
  toggleModal();
  restartGame();
  finalTime = 0;
}

function restartGame() {
    resetMatched();
    resetMoves();
    restartRating();
    stopClock();
    resetClock();
    resetCards();
    shuffleDeck();
}

function resetMatched() {
    matchedCards = [];
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

init();
