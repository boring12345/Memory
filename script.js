//------------------------------------ Global variables-------------------------------
// Is there a way to avoid such things?
	var minID,secID;
    var cardsHidden = [];
    var pairsFound = 0;
    var players = [];
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
	
//-------------------------------------- Clock --------------------------- 
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

//********************************************** Building the game frame **************************************************************
// To add players using jQuery
var addPlayers = function(nop) { //back-up
		var botCounter = 1
    for (var i = 1; i < nop+1; i++) {
		var name = prompt("Please insert first players name or 'bot' to add a non-human opponent");
		if(name.toLowerCase()=="bot"){
			name = "Bot "+botCounter;
			players[i-1] = new AI(i,name);
			botCounter++;	
		}
		else{
			players[i-1] = new Player(i,name);
		}
        $('#game_info_frame').append($('<div id="player' + i + '_frame" class="player_frame">' + players[i-1].name + '</div>'));
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
		gameIsRunning = true;
		var chooseSet = parseInt($("#set").val(), 10);
		startClock(true);
		if(chooseSet === 5) {  // Credits condition; perhaps we'll have to improve the way of showing credits
			var creditsText = "<h1> Credits </h1> <p> These are the people, who have contributed to this project: </p> <ul> <li> <strong> boring12345: </strong> leader and developer </li> <li> <strong> haxor789: </strong> lead developer </li> <li> <strong> hkapur97: </strong> lead developer </li> <li> <strong> DaVinniCode: </strong> developer </li> <li> <strong> Tachos: </strong> UI engineer </li> <li> <strong> mariomarine: </strong> Images </li> <li> <strong> AAM-Smith, Alex C, DeK: </strong> Testing & Helping </li>  </ul>";
			$("#game_board_frame").html(creditsText);
			return ;
		}
		var player = parseInt($("#nop").val(), 10);
		addPlayers(player);	
    	upCard = setUpCard[chooseSet]; 
    	cards  = set[chooseSet].slice();
		var noc = cards.length>=12 ? 12:cards.length;
		addImages(noc);
        cardsHidden = HideCards(noc);
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
	this.getNumber = function(){
			return number;
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
		for(var i=1;i<parseInt($("#nop").val(), 10)+1;i++){ 
			playerScore = parseInt($('#player'+i+'_matched').html(), 10);
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
    if (currentPlayer > parseInt($("#nop").val(), 10)) { currentPlayer = 1;}
};

//---------------------------------------------------------- Players ------------------------------------------------------------------------------------

function Player(number,name){
	this.score = 0;
	this.number = number;
	this.name = name;
	this.turns =0;
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------- Artifical Intelligence (or at least a non-human opponent :D) (not used yet) -------------------------------------
function AI(number,name){
	this.name = name;
	this.number = number;
	var queue = [];
	var queue = [];
	this.forget = function(){ //the queue array is limited to the last e.g. 7 cards
    	if(queue.length>7)
    	queue.shift();//shift deletes the 1 item of an array (and returns it)
    	//e.g. [1,2,3].shift() --> [2,3]
	};
	this.learn = function(input){
    	console.log(input.getSrc());
    	queue.push(input); //whenever a card is revealed store its position in queue
	};

	this.check = function(){
    	for(var i=0;i<queue.length;i++){
        	for(var j = i+1;j<queue.length;j++){
            	if(queue[i].getSrc()== queue[j].getSrc()){
                	return found(i,j);
            	}
        	}
    	}
    	return false;
	};

	this.found = function(i,j){//deletes a pair when found
		var pair = [];
    	pair.push(queue.splice(j,1)[0].getNumber());//j before i to keep the order in the array
    	pair.push(queue.splice(i,1)[1].getNumber());//splice returns the object in an array!!
    	return pair;    	
	};
	this.turn = function(){
		if(check() && check()[0].fadedOut == false){
			var pair = check();
			turn(pair[0]);
			turn(pair[1]);	
		}
		else{
			var ran1 = Math.floor(Math.random()*24+1);
			var ran2 = Math.floor(Math.random()*24+1);
			turn(ran1);
			turn(ran2);
		}
	};
}

AI.prototype = new Player();

//-------------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){	
	//var player = parseInt(prompt("How many players do we have today?"));
	//player = player>4?4:player;
   	$("#start").click(start);
	$("#quit").click(function(){
			setBack();
	});
	alert("Get your settings ready. Press start to begin!");
});

var turn = function(cid){ //cid means card_id and is number or a numerical string from "1" to "24" 
	var counter = hiddenCounter(cardsHidden);
	var id = cid;	
	var card = cardsHidden[id-1];
    if(counter<2 && !card.fadedOut){ 
       	$(card.getPlace()).attr("src", card.getSrc());
		card.hidden = false;
		lock = false;
		//ai.learn(card);
		//ai.forget();
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
};
  


    //toggles between code.png and the hidden card
$(document).on('click',".card_frame",function(){
	turn(this.id.split("card_").splice(1));
});
