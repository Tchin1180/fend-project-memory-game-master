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

//shuffle card before creating board
shuffle(deckOfCards);

//initialize game
function init () {
  resetMatched();
  resetClock();
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
            if (matchedCards.length === deckOfCards.length) {           gameOver();
            }
          } else {
            //flip it back
            setTimeout ( function() {
              currentCard.classList.remove('open', 'show', 'disable');
              firstCard.classList.remove('open', 'show', 'disable');
            }, 1000);
            //reset the arrays
            openCards = [];
            }
          } else {
              //flip card
                currentCard.classList.add('open', 'show','disable');
                openCards.push(this);
                //start counter
                if (clockOff) {
                  startClock();
                  clockOff = false;
                }
                addMove();
                rating();
          }
  });
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
  if (moves === 10 || moves === 20) {
    for (let i=0; i < starList.length; i++) {
        starList[0].remove();
    }
  } else {
    starList ="";
    starList = document.querySelectorAll('.fa-star');
  }
}

let starContainer = document.querySelector('.stars');
let defaultStar = document.querySelector('.stars').children;
function restartRating () {
  //restart star rating to 3 stars
  let starContainer =  document.querySelector('.stars').children;
  if ( moves < 10 ) {
      return false;
    } else if (moves === 10) {
        for (let i=0; i < starList.length; i++) {
          starContainer[0].classList.add('fa', 'fa-star');
        }
      } else if (moves > 10) {
        //fix bug if more than 5 moves, it defaults to 2 stars when resetted
          for (let i=0; i < starList.length; i++) {
            starContainer[i].classList.add('fa', 'fa-star');
          }
        }
}




const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  deck.innerHTML = "";
  restartGame();
  init();
  //resetMoves();
  //moves = 0; //restart moves to 0
  //moveCounter.innerHTML = moves;
});

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

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


//create a timer
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

function resetClock () {
  stopClock();
  time = 0;
  clockOff = true;
  displayTime();
}

function gameOver () {
    //game is over when the cards that are stored in the matched array equal total amount of cards in the deck
    console.log("Game Over");
    stopClock();
    toggleModal();
}


document.querySelector('.modalBtn').addEventListener('click', toggleModal);
document.querySelector('.modal_cancel').addEventListener('click', toggleModal);

function showModal() {
      const timeStat = document.querySelector('.modal_time');
      const clockTime = document.querySelector('.time').innerHTML;
      const movesStat = document.querySelector('.modal_moves');
      const starsStat = document.querySelector('.modal_stars');

      let finalTime = time;
      let finalMove = moves;
      let finalStar = [];

      if (finalMove >= 20 ) {
        starsStat.innerHTML = '<i class="fa fa-star"></i>';
      } else if (finalMove >= 10) {
          starsStat.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
      } else  { starsStat.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';}

      timeStat.innerHTML = `Time = ${finalTime}`;
      movesStat.innerHTML = `Moves = ${finalMove}`;
          //  console.log(finalTime); //final time
            //  console.log(finalMove); //final moves
              //      console.log(finalStar); //final star
}

const starsStat = document.querySelector('.modal_stars');
function countStars() {
  if (moves <= 10 ) {
    starsStat.innerHTML = `<li class="rating1"><i class="fa fa-star"></i></li><li class="rating1"><i class="fa fa-star"></i></li><li class="rating1"><i class="fa fa-star"></i></li>`;
    console.log(starsStat);
  } else if (moves <=20) {
      starsStat.innerHTML = `<li class="rating1"><i class="fa fa-star"></i></li><li class="rating1"><i class="fa fa-star"></i></li>`;
  } else {
    starsStat.innerHTML = `<li class="rating1"><i class="fa fa-star"></i></li>`;
  }

}


function toggleModal() {
  let modal = document.querySelector('.modal_body');
  let modalOverlay = document.querySelector('.modal-overlay');
  modal.classList.toggle('hide');
  modalOverlay.classList.toggle ('hide');
  showModal();
}

  document.querySelector('.modal_replay').addEventListener('click', replayGame);
  //restart game

  function resetCards() { //function turns down the cards to their original state.
      const cards = document.querySelectorAll('.deck li');
      for (let card of cards) {
          card.className = 'card';
      }
  }

function replayGame() {
  restartGame();
  toggleModal();
  finalTime = 0;
}

function restartGame() {
  restartRating();
  resetClock();
  stopClock();

  restartRating();
  resetMoves();
  resetMatched();
  resetCards();
}



function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

function resetMatched() {
    matchedCards = [];
}


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
