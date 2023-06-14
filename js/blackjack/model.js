//Global Variables
var BJ_CARDS; // holds the deck from the ajax call
var cardBackImgUrl = 'img/PlayingCards/';
var cardImageUrl = 'img/PlayingCards/PlayingCards';
//Ajax call to get the playing card information
$.ajax({
    async: false,
    dataType: "json",
    url: "apps/PlayingCards.json",
    success: function(data) {
        BJ_CARDS = data;
    },
    error: function() {
        console.log("Error: json has not loaded");
    }
}); //end of ajax call

function GameModel(deck, playerScore, playerHand, playerSuites,
    dealerScore, dealerHand, dealerSuites, face) {
    this.deck = deck;
    this.playerScore = playerScore;
    this.playerHand = playerHand;
    this.playerSuites = playerSuites;
    this.dealerScore = playerScore;
    this.dealerHand = dealerHand;
    this.dealerSuites = dealerSuites;
    this.face = face;
}

GameModel.prototype = {
    //empty the player and dealer's hand
    emptyHand: function() {
        this.playerScore = 0;
        this.playerHand = [];
        this.playerSuites = [];
        this.dealerScore = 0;
        this.dealerHand = [];
        this.dealerSuites = [];
        this.face = 0;
    },
    //put cards back into the deck
    restartDeck: function(cards) {
        for (var i = 0; i < cards.length; i++) {
            this.deck.push(cards[i]);
        }
    },
    //put suites back into the index in the deck
    restartSuites: function(suite, who) {
        var element;
        if (who === "player") {
            for (var i = 0; i < suite.length; i++) {
                element = parseInt(this.playerHand[i].card) - 1;
                this.deck[element].suites.push(suite[i]);
            }
        } else if (who === "dealer") {
            for (var i = 0; i < suite.length; i++) {
                element = parseInt(this.dealerHand[i].card) - 1;
                this.deck[element].suites.push(suite[i]);
            }
        }
    },

    //deal a number of cards and return the card(s)
    dealHand: function(numberOfCards) {
        var theCard = [];
        var theSuite = [];
        for (var i = 0; i < numberOfCards; i++) {
            var randomizedCardValue = Math.floor(Math.random() * this.deck.length);
            var randomizedSuiteValue = Math.floor(Math.random() * this.deck[randomizedCardValue].suites.length);
            var randomizedCard = this.deck[randomizedCardValue].card;
            var randomizedSuite = this.deck[randomizedCardValue].suites[randomizedSuiteValue];

            while (this.deck[randomizedCardValue].numberRemaining === 0) {
                randomizedCardValue = Math.floor(Math.random() * this.deck.length);
            }
            //push cards into array to be handed to dealer or player
            theCard.push(this.deck[randomizedCardValue]);
            //push randomized suite for different .png
            theSuite.push(randomizedSuite);
            //remove the suite from the suite array
            //so no duplicates
            this.removeCard(randomizedCard - 1, randomizedSuiteValue);
        } //end of forloop
        return [theCard, theSuite];
    },

    //remove a specific element from deck
    removeCard: function(element, suite) {
        this.deck[element].suites.splice(suite, 1);
    },
    //push cards into dealer or player's hand
    generateCard: function(cards, suites, who) {
        if (who === "player") {
            for (var i = 0; i < cards.length; i++) {
                this.playerHand.push(cards[i]);
                this.playerSuites.push(suites[i]);
            }
        } else if (who === "dealer") {
            for (var i = 0; i < cards.length; i++) {
                this.dealerHand.push(cards[i]);
                this.dealerSuites.push(suites[i]);
            }
        }
    },

    //set the dealer's hidden card
    //hidden = 1
    //revealed = 0
    hiddenCard: function(element) {
        this.face = element;
    },

    //generate the score of the hand that is passed into the function
    generateScore: function(currentHand, who) {
        var isAce = 0;
        if (who === "player") {
            this.playerScore = 0;
            for (var i = 0; i < currentHand.length; i++) {
                if (currentHand[i].value === 1) {
                    this.playerScore += 11;
                    isAce = 1;
                } else {
                    this.playerScore += currentHand[i].value;
                }
                if (this.playerScore > 21 && isAce === 1) {
                    this.playerScore -= 10;
                    isAce = 0;
                }
            }
        } else if (who === "dealer") {
            this.dealerScore = 0;
            for (var i = 0; i < currentHand.length; i++) {
                if (currentHand[i].value === 1) {
                    this.dealerScore += 11;
                    isAce = 1;
                } else {
                    this.dealerScore += currentHand[i].value;
                }
                if (this.dealerScore > 21 && isAce === 1) {
                    this.dealerScore -= 10;
                    isAce = 0;
                }
            }
        }
    },
    //calculate who the winner is and return the specific outcome
    getWinner: function(totalPlayerScore, totalDealerScore) {
        if ((totalPlayerScore > 21 && totalPlayerScore > 21) || (totalDealerScore === totalPlayerScore)) {
            return 0;
        }
        if (totalDealerScore > 21 || (totalPlayerScore <= 21 && (totalPlayerScore > totalDealerScore))) {
            if (totalPlayerScore === 21) {
                return 1;
            }
            return 2;
        }

        if (totalPlayerScore > 21 || (totalDealerScore <= 21 && (totalDealerScore > totalPlayerScore))) {
            if (totalDealerScore === 21) {
                return 3;
            }
            return 4;
        }
    },
    //get functions for each variable of the model
    getPlayerHand: function() {
        return this.playerHand;
    },

    getDealerHand: function() {
        return this.dealerHand;
    },
    getPlayerScore: function() {
        return this.playerScore;
    },

    getDealerScore: function() {
        return this.dealerScore;
    },

    getPlayerSuites: function() {
        return this.playerSuites;
    },

    getDealerSuites: function() {
        return this.dealerSuites;
    },

    getFace: function() {
        return this.face;
    }
}; //end of Game
