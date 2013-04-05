//------------------------------------ Global variables-------------------------------
// Is there a way to avoid such things?
	var minID,secID;
    var cardsHidden = [];
    var pairsFound = 0;
    var currentPlayer = 1;
	var gameIsRunning = false, lock = false; //to only allow 3 card clicks per players turn
    var all = ["23andmeAPI.png", "AddressBook.png", "BitlyAPI.png", "Blackjack.png", "Blackjack2.png", "Blackjack3.png", "BoxAPI.png", "CashRegister.png",
    	      "DiceGame.png", "DiceGame2.png", "DwollaAPI.png", "EasyPostAPI.png", "EvernoteAPI.png", "Fifty.png", "FireBaseAPI.png", "First.png", "FiveHundred.png",
			  "FizzBuzz.png", "WePayAPI.png", "FizzBuzz2.png", "Functions.png", "GiltAPI.png", "HelloNewYork.png", "HTML5.png", "HTML5old.png", "IfElse.png",
			  "IntroObjects.png", "IntroObjects2.png", "JavascriptAPI.png", "YouTubeAPI.png","JavascriptIntro.png", "JQuery.png", "KittenAPI.png", "LoyaltyAPI.png",
			  "MandrillAPI.png", "MashapeAPI.png", "NprAPI.png", "OAuth2API.png", "Olympics.png", "OneHundred.png", "OneThousand.png", "OrderInAPI.png",
			  "ParseAPI.png", "PHP.png", "Primitives.png", "Python.png", "PythonAPI.png", "ReviewFunctions.png", "Ruby.png", "RubyAPI.png", "SendGridAPI.png",
			  "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "SunlightAPI.png", "Ten.png", "TenThousand.png", "TwentyFive.png", "TwilioAPI.png", "TwitterAPI.png", "TwoHundred.png"]; 
    var jsCards = ["Blackjack2.png", "Blackjack3.png", "Blackjack.png", "DiceGame.png", "DiceGame2.png", "FireBaseAPI.png", "FizzBuzz2.png", "FizzBuzz.png",
   				  "Functions.png", "GiltAPI.png", "HelloNewYork.png", "IfElse.png", "IntroObjects2.png", "IntroObjects.png", "JavascriptAPI.png",
				  "JavascriptIntro.png", "LoyaltyAPI.png", "MandrillAPI.png", "Olympics.png", "ParseAPI.png", "Primitives.png",
				  "ReviewFunctions.png", "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "YouTubeAPI.png"];  
    var pointCards = ["Fifty.png", "First.png", "FiveHundred.png", "LoyaltyAPI.png", "OneHundred.png", "OneThousand.png", "Ten.png", "TwentyFive.png", "TwoHundred.png", "TenThousand.png"];
    var pythonCards = ["BitlyAPI.png", "DwollaAPI.png", "KittenAPI.png", "LoyaltyAPI.png", "NprAPI.png", "SunlightAPI.png", "WePayAPI.png"];  
    var rubyCards = ["23andmeAPI.png", "BoxAPI.png", "EasyPostAPI.png", "EvernoteAPI.png", "LoyaltyAPI.png", "MashapeAPI.png", "OAuth2API.png", "OrderInAPI.png",
   					"SendGridAPI.png", "TwilioAPI.png", "TwitterAPI.png", "WePayAPI.png"]; 
    var set = [all,jsCards,pointCards,pythonCards,rubyCards];
    var setUpCard = ["Code.png","Code.png","JQuery.png","Python.png","Ruby.png"]
    var upCard, cards =[];// set[chooseSet];
///*--------------------------------------Clock (not used yet)--------------------------- 
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
    /*startMS(),*/ startSec(), startMin();
};
//*/

//********************************************** Building the game frame **************************************************************
// To add players using jQuery
var addPlayers = function(nop) {
    for (var i = 1; i < nop+1; i++) {
        $('#game_info_frame').append($('<div id="player' + i + '_frame" class="player_frame">Player ' + i + '</div>'));
        $('#player' + i + '_frame').append('<br>Turns taken:<span id="player' +i+ '_score" </span>'); 
        $('#player' + i + '_frame').append('<br>Pairs Matched:<span id="player' +i+ '_matched" </span>');        
    }    
};

// To add images using jQuery
var addImages = function(noc) {
    $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    for (var i = 1; i < 2*noc+1; i++) {
        var div = '<div id="card_' + i + '" class="card_frame"><a target="_blank"><img src="Badges/'+upCard+'" alt="code"></a></div>';
        $('#game_board_frame').append($(div));
        if (i % 6 === 0)
            $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    }
};

var start = function(){//get new Cards by pressing start button 
		if (gameIsRunning) { return ;}
		startClock(true);
		var player = parseInt($("#nop").val());
		addPlayers(player);	
		var chooseSet = $("#set").val();//parseInt(prompt("0:all,1:JS,2:PC,3:Py,4:Ru"),10);	
    	upCard = setUpCard[chooseSet]; 
    	cards  = set[chooseSet].slice();
		var noc = cards.length>=12 ? 12:cards.length;
		addImages(noc);
        cardsHidden = HideCards(noc);
		gameIsRunning = true;
};
//+++++++++++++++++++++++++++++++++++++++++++ Preparing the cards ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//------------------------------------------- Image Constructor ---------------------------------------------------------------------- 
function Image(number,src){
	this.id = "#card_"+number; //id of the card_frame
    this.getSrc = function(){ 
        return "Badges/"+src;
    }
    this.getPlace =  function(){ //the image inside the card_frame of id 
        return this.id+ " img";
    }
    this.hidden = true;
    this.fadedOut = false;	
}

//--------------------------------------------- hkapur97's shuffle-duplicator----------------------------------------------------------
    var random = function() {
        return Math.random() - 0.5;
    };

    var duplicate = function(array) {
        return array.concat(array).sort(random);
    };
//---------------------------------------------- Hide some cards ------------------------------------------------------------------------

//creates the array of hidden cards
function HideCards(noc){
    var cardsToHide = []; 
    var cardsHidden = []
    for(i=0;i<noc;i++){
		var chosen =Math.floor(Math.random()*cards.length);
		cardsToHide.push(cards[chosen]);
		cards.splice(chosen,1);
    }
    cardsToHide = duplicate(cardsToHide);
    for(var i =1;i<noc*2+1;i++){
		cardsHidden[i-1]= new Image(i,cardsToHide[i-1]);
    }    
    return cardsHidden; 
}

//------------------------------------------------- SetBack function -------------------------------------------------------------------------
// Will be called from reset() and when clicking on quit
function setBack() {
	gameIsRunning = false;
	pairsFound = 0,cardsHidden = [];
	$('#game_board_frame').empty();
	$('#game_info_frame').empty();
	stopClock(true);
}
// Created due to D.R.Y.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//*****************************************************************************************************************************************


//---------------------------------------- Check functions --------------------------------------------------------------------------------

function hiddenCounter(array){ //counts how many cards are hidden
	var counter = 0;	
	for(var i in array){
		if(!array[i].hidden){
			counter++;
		}
	}
	return counter;
}

function reset(noc){// Game over!?
	if(pairsFound == noc){		
		//alert("press start to play again");
		var winner = "";
		var playerScore = 0;
	    var highscore = 0;
		for(var i=1;i<parseInt($("#nop").val())+1;i++){ 
			playerScore = parseInt($('#player'+i+'_matched').html());
			if(highscore == playerScore){
					winner+= " and Player"+i;
			}
			if(highscore < playerScore){
					highscore = playerScore;
					winner = "Player"+i;
			}			
		}
		setBack();
		if(confirm('Congratulations, '+winner+'. You won!\nWould you like to play again?')){ //need to declare the Winner in Multiplayer
    		start();	
		}
	}
}


var nextPlayer = function(){
    currentPlayer++;
    if (currentPlayer > parseInt($("#nop").val())) { currentPlayer = 1;}
};

//-------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){	
	//var player = parseInt(prompt("How many players do we have today?"));
	//player = player>4?4:player;
   	$("#start").click(start);
	$("#quit").click(function(){
			setBack();
	});
	alert("Get your settings ready. Press start to begin!");
});
  


    //toggles between code.png and the hidden card
$(document).on('click',".card_frame",function(){    
	var counter = hiddenCounter(cardsHidden);
	var id = this.id.split("card_").splice(1);
	var card = cardsHidden[id-1];
    if(counter<2 && !card.fadedOut){ 
       	$(card.getPlace()).attr("src", card.getSrc());
		card.hidden = false;
		lock = false;
	}
	if(hiddenCounter(cardsHidden) == 2 && !lock){ // or counter  == 2
		var array = [];
		var again = false;
        var turns = $('#player'+currentPlayer+'_score').html(); 
        turns++;
        $('#player'+currentPlayer+'_score').html(" "+turns); 
		cardsHidden.forEach(function(value,index){
				if(!cardsHidden[index].hidden){
					array.push(cardsHidden[index]);	
				}
		});
		if(array[0].getSrc() ==array[1].getSrc()){
			again = true;
            var pairsMatched = $('#player'+currentPlayer+'_matched').html(); 
            pairsMatched++;
            $('#player'+currentPlayer+'_matched').html(" "+pairsMatched); 
			array.forEach(function(value,index){
				$(array[index].getPlace()).fadeTo("normal",0);		
				array[index].fadedOut = true;
			});
			cardsHidden.forEach(function(value,index){ //to avoid scoring points in the 800ms fade out
				cardsHidden[index].hidden = true;
			});            

			pairsFound++;
			reset(cardsHidden.length/2);
		}
		else{
			setTimeout(function(){ // maybe search for a smoother fade out
				$(".card_frame img").attr("src","Badges/"+upCard);			
				cardsHidden.forEach(function(value,index){
					cardsHidden[index].hidden = true;
				});
			},1000);
		}
		if(!again){
        	nextPlayer();
		}
		lock = true;
	}
});
