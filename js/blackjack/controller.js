//controller for the game
function GameController(model, view) {
    this.model = model;
    this.view = view;
}
//controller functions
GameController.prototype = {
    //initialize the game
    //get the info from the model and put it into the view
    startGame: function() {
        //deal the dealer's cards
        var hand = this.model.dealHand(2);
        this.model.generateCard(hand[0], hand[1], "dealer");
        this.model.generateScore(this.model.getDealerHand(), "dealer");
        this.view.dealTheHand(hand[0], this.model.getDealerSuites(), this.model.getFace(), "dealer");
        this.model.hiddenCard(this.model.face);
        //deal the player's cards
        hand = this.model.dealHand(2);
        this.model.generateCard(hand[0], hand[1], "player");
        this.model.generateScore(this.model.getPlayerHand(), "player");
        this.view.dealTheHand(hand[0], this.model.getPlayerSuites(), this.model.getFace(), "player");
        this.view.showScore(this.model.getPlayerScore(), "player");
    },
    //when hit, get a card and push it into the player's hand
    hit: function() {
        //generate a new card for the player
        var card = this.model.dealHand(1);
        this.model.generateCard(card[0], card[1], "player");
        this.model.generateScore(this.model.getPlayerHand(), "player");
        this.view.showScore(this.model.getPlayerScore(), "player");
        this.view.dealTheHand(this.model.getPlayerHand(), this.model.getPlayerSuites(), this.model.getFace(), "player");
        //if hit over 21, dealer automatically wins
        if (this.model.getPlayerScore() > 21) {
            this.model.hiddenCard(1);
            this.view.dealTheHand(this.model.getDealerHand(), this.model.getDealerSuites(), this.model.getFace(), "dealer");
            this.view.showWinner("Dealer Wins!");
            this.view.showScore(this.model.getDealerScore(), "dealer");


            $("#hit").prop('disabled', true);
            $("#stay").prop('disabled', true);
        }
    },
    //when player stays, dealer generates new cards if < playerScore
    //but cannot generate new cards if 17 or higher
    //also goes to the model to ask who has won
    stay: function() {
        this.model.hiddenCard(1);
        if (this.model.getDealerScore() < this.model.getPlayerScore()) {
            while (this.model.getDealerScore() < 17) {
                var card = this.model.dealHand(1);
                this.model.generateCard(card[0], card[1], "dealer");
                this.model.generateScore(this.model.getDealerHand(), "dealer");
                this.view.dealTheHand(this.model.getDealerHand(), this.model.getDealerSuites(), this.model.getFace(), "dealer");
            }
        }
        this.view.showScore(this.model.getDealerScore(), "dealer");
        this.view.dealTheHand(this.model.getDealerHand(), this.model.getDealerSuites(), this.model.getFace(), "dealer");
        //show who wins the game
        var theWinner = this.model.getWinner(this.model.getPlayerScore(), this.model.getDealerScore());
        if (theWinner === 0) {
            this.view.showWinner("Tied Game. Pushed!");
        } else if (theWinner === 1) {
            this.view.showWinner("Blackjack! Player Wins!");
        } else if (theWinner === 2) {
            this.view.showWinner("Player Wins!");
        } else if (theWinner === 3) {
            this.view.showWinner("Blackjack! Dealer Wins!");
        } else if (theWinner === 4) {
            this.view.showWinner("Dealer Wins!");
        }
    },
    //put the suites and cards back into the deck
    restart: function() {
        this.view.showWinner("");
        this.view.showScore("", "dealer");
        this.model.restartSuites(this.model.getPlayerSuites(), "player");
        this.model.restartSuites(this.model.getDealerSuites(), "dealer");
        this.model.restartDeck(this.model.getPlayerHand());
        this.model.restartDeck(this.model.getDealerHand());
        this.model.emptyHand();
        this.startGame();
    }
}; //end of Controller

//create the objects
var model = new GameModel(BJ_CARDS, 0, [], [], 0, [], [], 0);
var view = new GameView();
var controller = new GameController(model, view);
//begin blackjack
controller.startGame();
