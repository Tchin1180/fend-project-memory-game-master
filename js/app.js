/*
 * Create a list that holds all of your cards
 */
const deckOfCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube','fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

const deck = document.querySelector('.deck');
let card = [];
let openCards = [];
let matchedCards = [];

//initialize game
function init () {
  //create the board and place cards on top
  for (let i=0; i<deckOfCards.length; i++) {
     const card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class="fa ${deckOfCards[i]}"></i>`;
     deck.appendChild(card);

     //randomly shuffle board
     /*shuffle(cards);*/

     //run clickedCard function to add click event listener
     clickedCard(card);
   }
}

function clickedCard(card) {
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
              current.card.classList.remove('open', 'show', 'disable');
              first.card.classList.remove('open', 'show', 'disable');
            }, 1000);
            //reset the arrays
            openCards = [];

            //create counter addMove();
            }
          } else {
            //flip card
            currentCard.classList.add('open', 'show','disable');
            openCards.push(this);
          }

      });
  }

function gameOver () {
    //game is over when the cards that are stored in the matched array equal total amount of cards in the deck
    if (matchedCards.length === deckOfCards.length) {
        console.log("Game won")
        //stopTimer();
        //showModal();
        //toggleModal();
    }
}


/*      //const clickTarget = event.target;
      if (clickTarget.classList.contains('card') &&
          clickTarget.length < 2 ) {
        clickTarget.classList.toggle('open');
        clickTarget.classList.toggle('show');
        console.log(card);
      }
        //check to see: if card has class card, and open only 2 cards, and didn't click the same card
        //  if (card.classList.contains('card') &&
        //      openCard.length < 2 &&
        //      !openCard.includes(card)) {
            //card.classList.toggle('open');
          //  card.classList.toggle('show');

        //      }
    //add opened cards to new openCard array LOOK TO SEE IF WE CAN PUSH IF IT MATCHEs
     openCard.push(card);
  addOpenCard();
});

  }*/

function addOpenCard () {
  if (card.length === 2) {
    if (card[0] === card[1]) {
      console.log(card);
      //  matchedOpenCards();
        card.classList.add('match');
      //  console.log('Matched');
      } else if (openCard[0] != openCard[1]) {
          console.log('Unmatched');
          setTimeout(function() {

          //  console.log(openCard[0]);
          //  console.log(openCard[1]);
            //classList.remove('show');

            //console.log(openCard);
          }, 1000);
        }
  }
}

//if the cards match
function matchedOpenCards () {
  card.classList.add('match'); //not working
  card.classList.add('match');
  card[0].classList.remove('show', 'open');
  card[1].classList.add('show', 'open');
  openCard.length = 0;
}

function matchedOpenCards () {

}
//if the cards do not match
function unmatchedOpenCards () {


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
