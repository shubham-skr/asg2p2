/**************************************************************
 Functionality I
 
 * Load the pack of cards from json file.
 * Create card div.
 * Calculate the value of the card by rank.

**************************************************************/

window.addEventListener('load', displayPackOfCards);

// load the pack of cards from pack-of-cards.json file
function displayPackOfCards() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'pack-of-cards.json');
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200) {
      var cards = JSON.parse(this.responseText);

      const clubContainer = document.getElementById('club-cards');
      const diamondContainer = document.getElementById('diamond-cards');
      const heartContainer = document.getElementById('heart-cards');
      const spadeContainer = document.getElementById('spade-cards');

      for (let card of cards) {
        const cardDiv = createCardDiv(card);

        if (card.SUIT === 'CLUB') {
          clubContainer.appendChild(cardDiv);
        } else if (card.SUIT === 'DIAMOND') {
          diamondContainer.appendChild(cardDiv);
        } else if (card.SUIT === 'HEART') {
          heartContainer.appendChild(cardDiv);
        } else {
          spadeContainer.appendChild(cardDiv);
        }
      }
    }
  };
}

// Create card div
function createCardDiv(card) {
  const suit = card.SUIT;
  const rank = card.RANK;
  const cardName = `${suit}-${rank}`;

  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('data-card', cardName);
  cardDiv.setAttribute('data-value', getCardValue(rank));
  cardDiv.innerHTML = `<img src="./images/${suit.toLowerCase()}/${cardName}.png" alt="${cardName}">`;

  return cardDiv;
}

// Calculate the value of the card by rank
function getCardValue(rank) {
  let value = 0;

  switch (rank) {
    case 'TWO':
      value = 0;
      break;
    case 'THREE':
      value = 1;
      break;
    case 'FOUR':
      value = 2;
      break;
    case 'FIVE':
      value = 3;
      break;
    case 'SIX':
      value = 4;
      break;
    case 'SEVEN':
      value = 6;
      break;
    case 'EIGHT':
      value = 7;
      break;
    case 'NINE':
      value = 8;
      break;
    case 'TEN':
      value = 9;
      break;
    case 'JACK':
      value = 10;
      break;
    case 'QUEEN':
      value = 11;
      break;
    case 'KING':
      value = 12;
      break;
    case 'ACE':
      value = 13;
      break;
  }

  return value;
}

/********************************************************************
 Functionality II
 
 * Sort the cards in ascending order on clicking ascending button.
 * Sort the cards in descending order on clicking descending button.

*********************************************************************/

const ascendingButtons = document.querySelectorAll('.ascending-btn');
ascendingButtons.forEach((ascBtn) => {
  ascBtn.addEventListener('click', sortCardsAsc);
});

const descendingButtons = document.querySelectorAll('.descending-btn');
descendingButtons.forEach((descBtn) => {
  descBtn.addEventListener('click', sortCardsDesc);
});

// Sort the cards in ascending order
function sortCardsAsc(event) {
  const target = event.currentTarget;
  const cardsContainer = target.parentElement.nextElementSibling;

  const cards = Array.from(cardsContainer.children);
  cards.sort((card1, card2) => {
    return (
      +card1.getAttribute('data-value') - +card2.getAttribute('data-value')
    );
  });

  cards.forEach((card) => cardsContainer.appendChild(card));
}

// Sort the cards in descending order
function sortCardsDesc(event) {
  const target = event.currentTarget;
  const cardsContainer = target.parentElement.nextElementSibling;

  const cards = Array.from(cardsContainer.children);
  cards.sort((card1, card2) => {
    return -(
      +card1.getAttribute('data-value') - +card2.getAttribute('data-value')
    );
  });

  cards.forEach((card) => cardsContainer.appendChild(card));
}

/*********************************************************
 Functionality III
 
 * Shuffle the suits on clicking the shuffle button.

*********************************************************/

const shuffleButton = document.getElementById('shuffle-btn');
shuffleButton.addEventListener('click', shuffleSuits);

// Shuffle the suits
function shuffleSuits() {
  const suitsContainer = document.getElementById('suits');
  const suits = Array.from(suitsContainer.children);
  for (let i = suits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [suits[i], suits[j]] = [suits[j], suits[i]];
  }
  suits.forEach((suit) => suitsContainer.appendChild(suit));
}
