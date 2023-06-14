//the view class
function GameView() {
    $("#hit").click(function() {
        controller.hit();
    });

    $("#stay").click(function() {
        //disable the hit and stay button since game is over
        $(this).prop('disabled', true);
        $("#hit").prop('disabled', true);
        controller.stay();
    });

    $("#restart").click(function() {
        $("#stay").prop('disabled', false);
        $("#hit").prop('disabled', false);
        controller.restart();
    });
}

//view functions
GameView.prototype = {
    //display the player and dealer's hand
    dealTheHand: function(cards, suites, face, who) {
        var playerHand = [];
        if (who === "player") {
            for (var i = 0; i < cards.length; i++) {
                playerHand += "<img id='play-cards" + "' class='card-piece" + cards[i].card + suites[i] + "' src='" + cardImageUrl + cards[i].card + suites[i] + ".png" + "'></img>";
            }
            $('#playerCards').html(playerHand);
        }
        if (who === "dealer") {
            var dealerHand = [];
            for (var i = 0; i < cards.length; i++) {
                //have one card face down
                if (face === 0) {
                    dealerHand += "<img id='hidden-card" + "' class='card-piece" + cards[i].card + suites[i] + "' src='" + cardBackImgUrl + "golden-cardback.png" + "'></img>";
                    face = 1;
                } else {
                    dealerHand += "<img id='play-cards" + "' class='card-piece" + cards[i].card + suites[i] + "' src='" + cardImageUrl + cards[i].card + suites[i] + ".png" + "'></img>";
                }
            }
            $('#dealerCards').html(dealerHand);
        }
    },
    //display the player and dealer's score
    showScore: function(score, who) {
        if (who === "player") {
            $("#playerScore").html(score);
        } else if (who === "dealer") {
            $("#dealerScore").html(score);
        }
    },
    //display who the winner is
    showWinner: function(winner) {
        $("#declareWinner").html(winner);
    }
}; //end of View
