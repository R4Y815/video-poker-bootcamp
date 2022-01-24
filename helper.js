/* ======================
 * ---HELPER FUNCTIONS---
 * ====================== */

/* == Global Variables=== (cardInfo keys: rank)
 * ====================== */




/* FN: GEN RANDOM NUMBERS FOR ARRAY */
const getRandomIndex = (size) => Math.floor(Math.random() * size);


/* FN: FOR SHUFFLING */
const shuffleCards = (cards) => {
  for (let index = 0; index < cards.length; index += 1) {
    const randomIndex = getRandomIndex(cards.length);

    const currentItem = cards[index];

    const randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
  }
  return cards;
};

/* FN: GENERATING A CARD DECK 
 * make a new deck by "deck = makeDeck()" */
const makeDeck = () => {
  const boxOf52Cards = [];

  /* make 52 cards
   * rank 1-13 (1-10 and jack, queen, king and ace) - innermost loop?
   * 1-4 suits hearts diamonds, clubs,spades -outtermost loop? */

  /* Outermost loop for suits */
  let suitIndex = 0;
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitsEmoji = ['♥', '♦', '♣', '♠'];
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex];
    let currentEmoji = suitsEmoji[suitIndex];

    //innermost loop for rank
    let rankCounter = 1;
    while (rankCounter <= 13) {
      let cardName = rankCounter;
     /*  let valueNumber = rankCounter; */

      //rank 1, 11, 12, 13 are not number cards
      if (cardName == 1) {
        cardName = 'ace';
        /* valueNumber = 11; */
      } else if (cardName == 11) {
        cardName = 'jack';
        /* valueNumber = 10; */
      } else if (cardName == 12) {
        cardName = 'queen';
        /* valueNumber = 10; */
      } else if (cardName == 13) {
        cardName = 'king';
        /* valueNumber = 10; */
      }

      let card = {
        name: cardName.toString(),
        suit: currentSuit,
        suitEmoji: currentEmoji,
        rank: rankCounter,
        /* value: valueNumber, */
        hold: false,
      };

      boxOf52Cards.push(card);
      rankCounter = rankCounter + 1;
    }

    suitIndex = suitIndex + 1;
  }

  return boxOf52Cards;
};




/* MINI- FN: SORT CARDS IN HAND AND REARRANGE THEM */
const sortRank = (hand) =>{ /*remb hand is an array*/
  /* rearrange them from highest to lowest (b - a) */
    hand.sort((a,b) => parseFloat(b.rank) - parseFloat(a.rank));
    return hand;
  };

/* FN: COLLATED COUNT OF PLYR1'S HAND */
let cardNameTally; /* ===================> This needs to be in Game Init, always need Tally OBJ */
cardNameTally = {}; /* ===================> This needs to be in Game Init, always need Tally OBJ */

const cardTally =(hand)=>{/* ============> This needs to be in Game Init, always need Tally OBJ */
/* run a loop over the hand of cards in question */
  for (let i = 0; i < handSize; i += 1) {
    const cardName = hand[i].name;
    /* if seen card name before, increment its count  */
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    /* else, initialise count of this card name to 1 */
    else {
      cardNameTally[cardName] = 1;
    }
  }
for (cardName in cardNameTally) { /*cardNameTally[cardName] gives the value to the key (cardName) */
  console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);
}
};

/* FN: CHECK Same Rank 5 cards SAME SUIT
 * use set() to check
 * if true, then it's a flush                    */
const checkSameRank = (hand) => { /* remb hand is an array */
  const suitsInHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    suitsInHand.push(hand[i].suit);
  }

  const suitsInHandSet = new Set(suitsInHand);
  if (suitsInHandSet.size === 1) {
    return true;
  } else {
    return false;
  }

};


/* FN: CHECK SEQUENTIAL( all cards are a.p. with d = 1, but different suit )*/

const checkSequential = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand)); /* so as not to mutate origin array */
  sortRank(handClone);
  const diffTracker = [];
  for (let i = 0; i < handClone.length - 1; i += 1) {
    let diff = handClone[i].rank - handClone[i + 1].rank;
    diffTracker.push(diff);
  }

  const diffSet = new Set(diffTracker);
  if (diffSet.size === 1) { /* principle based on arithmetic progression d = 1 constant */
    answer = true;
  } else if (
  /* A, 10, 9, 8, 7 */
    handClone[0].rank === 10
    && handClone[1].rank === 9
    && handClone[2].rank === 8
    && handClone[3].rank === 7
    && handClone[4].rank === 1
  ) { answer = true;
  } else if (
  /* Q, A, 10, 9, 8 */
    handClone[0].rank === 12
    && handClone[1].rank === 10
    && handClone[2].rank === 9
    && handClone[3].rank === 8
    && handClone[4].rank === 1
  ) { answer = true;
  } else if (
  /* K, Q, A, 10, 9 */
    handClone[0].rank === 13
    && handClone[1].rank === 12
    && handClone[2].rank === 10
    && handClone[3].rank === 9
    && handClone[4].rank === 1
  ) { answer = true;
  }
  return answer;
};

/* ++++++++++++++++++++++++++++++++++++-TEST CASE
if (cardCount2(testHand,'ace') === 3) {
  console.log('There is a triplet in hand');
};
 ++++++++++++++++++++++++++++++++++++-TEST CASE */

/* FN: CHECK FOR 3 CARDS OF THE SAME RANK */
/* use the same as above! */
const checkTriplets = (hand) => {
  let answer = false;
  let numOfTriplets = 0;
  let handClone = JSON.parse(JSON.stringify(hand)); 
  sortRank(handClone);
  for (let i = 0; i < handClone.length - 2; i += 1) {
    if (handClone[i].rank === handClone[i + 1].rank 
      && handClone[i + 1].rank === handClone[i + 2].rank) { 
      numOfTriplets += 1;
    }
  }
  for (let j = 1; j < handClone.length - 2; j += 1) {
    if (handClone[0].rank === handClone[j] 
      &&  handClone[j] === handClone[4]) {
        numOfTriplets += 1;
      }
  }
  console.log('Number of Triplets found = ', numOfTriplets);
 
  if (numOfTriplets === 1) {
    answer = true;
  }

  return answer;
};

/* FN: CHECK FOR TWO PAIRS */
const check2pairs = (hand) => {
  let answer = false;
  for (let i = 0; i < hand.length; i += 1) {
    console.log('LOOP NUMBER, i =', i);
    let handClone = JSON.parse(JSON.stringify(hand)); 
    sortRank(handClone);
    handClone.splice(i, 1);
    console.log ('handClone =', handClone);
    let handRanks = [];
    for (let j = 0; j < handClone.length; j += 1) {
      handRanks.push(handClone[j].rank);
      console.log ('handRanks =', handRanks);
    }
    const handRankSet = new Set(handRanks);
    console.log ('handRankSet =', handRankSet);
    if (handRankSet.size === 2) {
      answer = true;
    }
  }
  return answer;
};

/* FN: CHECK FOR A PAIR */
/* note: this cannot be used the same way as other check fns*/
const countPairs = (hand) => {
  let handClone = JSON.parse(JSON.stringify(hand)); 
  sortRank(handClone);
  let nmbrOfPairs = 0;
 
  /* stage 1: 1st 4 combinations */
  for (let i = 0; i < handClone.length - 1; i += 1) {
   /*  console.log('stage1 Loop, i =', i) */
    if(handClone[i].rank === handClone[i + 1].rank) { 
      nmbrOfPairs += 1;
    } 
}
console.log(`${nmbrOfPairs}pairs found after stage 1` );

  /* stage 2: next 3 combinations */
  for (let j = handClone.length - 1; j > 1; j -= 1) {
    if(handClone[0].rank === handClone[j].rank) { 
      nmbrOfPairs += 1;
  } 
}
console.log(`${nmbrOfPairs}pairs found after stage 2` );

  /* stage 3: next 2 combinations */
  for (let k = handClone.length - 1; k > 2; k -= 1) {
    if(handClone[1].rank === handClone[k].rank){ 
      nmbrOfPairs += 1;
  } 
}
console.log(`${nmbrOfPairs}pairs found after stage 3` );

  /* stage 4: final 1 combination */
  if(handClone[2].rank === handClone[4].rank){ 
    nmbrOfPairs += 1;
  } 
  console.log(`${nmbrOfPairs}pairs found after stage 4` );
  
/* check the state of the stages */




  return nmbrOfPairs;
};

/* FN: CHECK NO REPEATS */

const checkNoRepeats = (hand) => {
  let answer = false;
  const repeatedCards = [];
  let repeatedRanks = [];
  const handClone = JSON.parse(JSON.stringify(hand)); /* so as not to mutate origin array */
  sortRank(handClone);
  console.log(handClone);
  let pairCount = 0;
  for (let i = 0; i < handClone.length - 1; i += 1) {
    if (handClone[i].rank === handClone[i + 1].rank) {
      repeatedCards.push(handClone[i]);
      repeatedCards.push(handClone[i + 1]);
      repeatedRanks.push(handClone[i].rank);
      repeatedRanks.push(handClone[i + 1].rank);
      pairCount += 1;
      const repeatedRanksSet = new Set(repeatedRanks);
    }
  }

  if (pairCount === 0 && repeatedCards.length === 0) {
    answer = true;
  }
  return answer;
};









/*  ***READING THE CARDS***
 *  LOGIC:Search for Winning Types in descending order of points 
 *  Fn :check for same suit (same suit && non-sequential = FLUSH)
 *  Fn :check for sequentials (only sequentials = STRAIGHT, 
 *                             sequentials + same suit = STR. FLUSH)
 *  Fn :check for royals (13 && 12 & 11 & 10 & 1 + same suit = ROYAL FLUSH) 
 *  Fn :check for quads  ( 4-OF-A-KIND)
 *  Fn :check for triplets (3-OF-A-KIND, 
 *                          triplet + pairs = FULL HOUSE)
 *  Fn :check for pairs  ( 1 PAIR, 
 *                         2 PAIRS )
 *  Fn :check for kickers( HIGH CARD)  
 *                        (regardless of kickers.length) 
 *                        (useful only when playing against another playerS)
 *  QUESTION:
 *  1) DO WE CHECK FOR REPEATS OF RANK THEN COUNT THE REPEATS? 
 *  or 
 *  2) USE OBJ TALLY AND THEN USE IF/ELSE TO MATCH TO HAND COMBI? 
 *  3) is it possible to make the tally function anonymous
 *     so that it becomes 1 single root to be used to search
 *     for the different card names? */

/* ***ACTIONS AFTER READING THE CARDS***
  * Fn : Assign score to player according to hand
  * Fn : Total score for player according to bets placed
  * Fn :
  * */