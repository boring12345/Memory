// Global variables
var array = [], // The array of images
    minID, secID; // The unique IDs of setInterval

// Used for sorting array randomly
var random = function() {
    return Math.random() - 0.5;
};

// Starts the minutes of the clock
var startMin = function() {
    minID = setInterval(function(){
        var previous = +$('#min').text();
        var next = previous === 59 ? 0 : previous + 1;
        $('#min').text(next > 9 ? next : '0' + next);
    }, 60000);
};

// Starts the seconds of the clock
var startSec = function() {
    secID = setInterval(function(){
        var previous = +$('#sec').text();
        var next = previous === 59 ? 0 : previous + 1;
        $('#sec').text(next > 9 ? next : '0' + next);
    }, 1000);
};

// Optional parameter, if true, resets the clock
var stopClock = function(bool) {
    if (bool)
        $('#min').text('00'), $('#sec').text('00');
    clearInterval(minID), clearInterval(secID);
};

// Optional parameter, if true, stops the clock
var startClock = function(bool) {
    if (bool)
        stopClock();
    startMS(), startSec(), startMin();
};



// To add players using jQuery
var addPlayers = function() {
    for (var i = 1; i < 5; i += 1)
        $('#game_info_frame').append($('<div id="player' + i + '_frame" class="player_frame">Player ' + i + '</div>'));
};

// To add images using jQuery
var addImages = function() {
    $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    for (var i = 1; i < 25; i++) {
        var div = '<div id="card_' + i + '" class="card_frame"><a target="_blank"><img src="badges/code.png" alt="code"></a></div>';
        $('#game_board_frame').append($(div));
        if (i % 6 === 0)
            $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    }
};

//Image Constructor it contains the image src and the jQuery selector
function Image(number,src){
    this.getSrc = function(){
        return "badges/"+src;
    }
    this.getPlace =  function(){
        return "#card_"+number+ " img";
    }
    this.hidden = true;
}

//------ hkapur97's shuffle-duplicator--------------
    var random = function() {
        return Math.random() - 0.5;
    };

    var duplicate = function(array) {
        return array.concat(array).sort(random);
    };
//--------------------------------------------------

//creates the array of hidden cards
function HideCards(){
    var cards = ["23andmeAPI.png", "AddressBook.png", "BitlyAPI.png", "Blackjack.png", "Blackjack2.png", "Blackjack3.png", "BoxAPI.png", "CashRegister.png"/*, "Code.png"*/,
    "DiceGame.png", "DiceGame2.png", "DwollaAPI.png", "EasyPostAPI.png", "Fifty.png", "FireBaseAPI.png", "First.png", "FiveHundred.png", "FizzBuzz.png", "WePayAPI.png",
    "FizzBuzz2.png", "Functions.png", "HelloNewYork.png", "HTML5.png", "IfElse.png", "IntroObjects.png", "IntroObjects2.png", "JavascriptAPI.png", "YouTubeAPI.png",
    "JavascriptIntro.png", "JQuery.png", "KittenAPI.png", "LoyaltyAPI.png", "MandrillAPI.png", "MashapeAPI.png", "OAuth2API.png", "Olympics.png", "OneHundred.png",
    "OneThousand.png", "OrderInAPI.png", "ParseAPI.png", "PHP.png", "Primitives.png", "Python.png", "PythonAPI.png", "ReviewFunctions.png", "Ruby.png", "RubyAPI.png",
    "SendGridAPI.png", "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "Ten.png", "TwentyFive.png", "TwilioAPI.png", "TwitterAPI.png", "TwoHundred.png"]; 
    var cardsToHide = []; 
    var cardsHidden = []
    for(i=0;i<12;i++){
	var chosen =Math.floor(Math.random()*cards.length);
	cardsToHide.push(cards[chosen]);
	cards.splice(chosen,1);
    }
    cardsToHide = duplicate(cardsToHide);
    for(var i =1;i<25;i++){
	cardsHidden[i-1]= new Image(i,cardsToHide[i-1]);
    }    
    return cardsHidden;
}




$(document).ready(function(){
    addPlayers();
    addImages(); 
    var cardsHidden = [];

    //get new Cards by pressing start button    
    $("#start").click(function(){
        cardsHidden = HideCards(); 
    });
  
    //jQuery selector for all cards
    var $cards = $("img");

    //toggles between code.png and the hidden card
    $(".card_frame").click(function() {
	var id = this.id.split("card_").splice(1);
	var card = cardsHidden[id-1];
        //if( not more then two not hidden cards) 
	//var src = card.hidden ? card.getSrc() : "badges/code.png";
        $(card.getPlace()).attr("src", card.getSrc());
	card.hidden = false;
	//else $cards.attr("src", "badges/code.png");
    });
});
