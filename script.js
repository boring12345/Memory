//------------------------------------ Global variables-------------------------------
// Is there a way to avoid such things?
    var minID,secID;
    var cardsHidden = [];
    var pairsFound = 0;    
    var players = [];
    var cp = 1;//currentPlayer
    var debugMode = false;  // If true, leaves cards uncovered for debugging purposes

	var gameIsRunning = false, lock = false; //to only allow 3 card clicks per players turn
    var all = ["23andmeAPI.png", "AddressBook.png", "ApigeeAPI.png", "BitlyAPI.png", "Blackjack.png", "Blackjack2.png", "Blackjack3.png", "BoxAPI.png", "CashRegister.png",
    	      "DiceGame.png", "DiceGame2.png", "DwollaAPI.png", "EasyPostAPI.png", "EvernoteAPI.png", "Fifty.png", "FireBaseAPI.png", "First.png", "FiveHundred.png",
			  "FizzBuzz.png", "WePayAPI.png", "FizzBuzz2.png", "Functions.png", "GiltAPI.png", "HelloNewYork.png", "HTML5.png", "HTML5old.png", "IfElse.png",
			  "IntroObjects.png", "IntroObjects2.png", "JavascriptAPI.png", "YouTubeAPI.png","JavascriptIntro.png", "JQuery.png", "KittenAPI.png", "LoyaltyAPI.png",
			  "MandrillAPI.png", "MashapeAPI.png", "NhtsaAPI.png", "NprAPI.png", "OAuth2API.png", "Olympics.png", "OneHundred.png", "OneThousand.png", "OrderInAPI.png",
			  "ParseAPI.png", "PHP.png", "Primitives.png", "Python.png", "PythonAPI.png", "ReviewFunctions.png", "Ruby.png", "RubyAPI.png", "SendGridAPI.png",
			  "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "SunlightAPI.png", "Ten.png", "TenThousand.png", "TwentyFive.png", "TwilioAPI.png", "TwitterAPI.png", "TwoHundred.png"]; 
    var jsCards = ["ApigeeAPI.png", "Blackjack2.png", "Blackjack3.png", "Blackjack.png", "DiceGame.png", "DiceGame2.png", "FireBaseAPI.png", "FizzBuzz2.png", "FizzBuzz.png",
   				  "Functions.png", "GiltAPI.png", "HelloNewYork.png", "IfElse.png", "IntroObjects2.png", "IntroObjects.png", "JavascriptAPI.png",
				  "JavascriptIntro.png", "LoyaltyAPI.png", "MandrillAPI.png", "Olympics.png", "ParseAPI.png", "Primitives.png",
				  "ReviewFunctions.png", "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "YouTubeAPI.png"];  
    var pointCards = ["Fifty.png", "First.png", "FiveHundred.png", "LoyaltyAPI.png", "OneHundred.png", "OneThousand.png", "Ten.png", "TwentyFive.png", "TwoHundred.png", "TenThousand.png"];
    var pythonCards = ["BitlyAPI.png", "DwollaAPI.png", "KittenAPI.png", "LoyaltyAPI.png", "NhtsaAPI.png", "NprAPI.png", "SunlightAPI.png", "WePayAPI.png"];  
    var rubyCards = ["23andmeAPI.png", "BoxAPI.png", "EasyPostAPI.png", "EvernoteAPI.png", "LoyaltyAPI.png", "MashapeAPI.png", "OAuth2API.png", "OrderInAPI.png",
   					"SendGridAPI.png", "TwilioAPI.png", "TwitterAPI.png", "WePayAPI.png"]; 
    var set = [all,jsCards,pointCards,pythonCards,rubyCards];
    var setUpCard = ["Code.png","Code.png","JQuery.png","Python.png","Ruby.png"]
    var upCard, cards =[];// set[chooseSet];
    var mode = {
    	loser: 0,
    	easy:5,
    	medium:7,
    	hard:9,
    	impossible:12,
    	insane:16
    };
	//all: 61 pairs, jsCards: 26 pairs, pointCards: 10 pairs, pythonCards: 7 pairs, rubyCards: 12 pairs

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
		if(players.length===1 && next%30 === 0){ //Score Reduction!
			players[0].points -=players[0].points > 0? 5:0;
			$('#player'+players[0].number+'_points').html(" "+players[0].points);
		}
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
	var botCounter = 1;
	players = [];
   	for (var i = 1; i < nop+1; i++) {
		var name = prompt("Please insert your name or 'bot' to add a non-human opponent");		
		if(name.split(" ")[0].toLowerCase()=="bot"){
			var difficulty = name.split(" ")[1];
			name = "Bot "+botCounter;
			players[i-1] = new AI(i,name);
			if(!isNaN(difficulty)){
				console.log("test");
				players[i-1].difficulty = difficulty;
			}
			else {
				if(!isNaN(mode[difficulty])){
					players[i-1].difficulty = mode[difficulty];	
				}
				else{
					players[i-1].difficulty = 7;	
				}				
			}
			botCounter++;	
		}
		else{
			players[i-1] = new Player(i,name);
		}
        $('#game_info_frame').append($('<div id="player' + i + '_frame" class="player_frame">' + players[i-1].name + '</div>'));
        $('#player' + i + '_frame').append('<br>Turns taken:<span id="player' +i+ '_turns" </span>'); 
        $('#player' + i + '_frame').append('<br>Pairs Matched:<span id="player' +i+ '_matched" </span>');        
    }    
};

// To add images using jQuery
var addImages = function(noc,cpr) {
    $('#game_board_frame').append($('<div class="game_board_spacer"></div>'));
    for (var i = 1; i < 2*noc+1; i++) {
        var div = '<div id="card_' + i + '" class="card_frame"><a target="_blank"><img src="Badges/'+upCard+'" alt="code"></a></div>';
        $('#game_board_frame').append($(div));
	if (i % cpr === 0)
		$('#game_board_frame').append($('<div class="game_board_spacer"></div>'));
    }
};

var start = function(){//get new Cards by pressing start button
	    var chooseSet = parseInt($("#set").val(), 10);
		if(players.length == 0 && chooseSet!=5){//As long as the UI is in beta status
			//var player = parseInt($("#nop").val(), 10);
			//addPlayers(player);
			return;
		}
		$('#game_board_frame').empty();	
		if(players.length>0) {swap();}
		if (gameIsRunning) { return ;}		
		startClock(true);
		if(chooseSet === 5) {  // Credits condition; perhaps we'll have to improve the way of showing credits
			var creditsText = "<h1> Credits </h1> <p> These are the people, who have contributed to this project: </p> <ul> <li> <strong> boring12345: </strong> leader and developer </li> <li> <strong> haxor789: </strong> main lead developer </li> <li> <strong> hkapur97: </strong> lead developer </li> <li> <strong> DaVinniCode: </strong> lead developer </li> <li> <strong> Tachos: </strong> UI engineer </li> <li> <strong> mariomarine: </strong> Images </li> <li> <strong> AAM-Smith, Alex C, DeK: </strong> Testing & Helping </li>  </ul>";
			$("#game_board_frame").html(creditsText);
			return ;
		}		
		gameIsRunning = true;
		
		//------------------------------- UI Changes ----------------------
		$('#addPlayer').hide();
		$('.delete').hide();		
   		$('.duringGame').show();
		//-------------------------------------------------------------------------------------

		upCard = setUpCard[chooseSet]; 
    	cards  = set[chooseSet].slice();
		var cardsPerRow = parseInt($("#boardSize").val().substring(0,1),10); 
		var rowsOfCards = parseInt($("#boardSize").val().substring(1,2),10); 		
		
		if ((cardsPerRow*rowsOfCards) <= cards.length*2) {  // If the set has enough cards to fill the chosen board size.
			noc = (cardsPerRow * rowsOfCards)/2;			
		}  else if (cards.length*2<=24) {                        // If set is small, just use small board (6x4)
			noc = cards.length; 
			cardsPerRow = 6; 
			rowsOfCards = 4;
			}  
		else {					// If set is larger than small board, but smaller than chosen board.
			noc = cards.length;		
		}
		$('#game_board_frame').css({'width':cardsPerRow * 122,'height':rowsOfCards * 128});
		$('#game_frame').css({'width':cardsPerRow * 122 + 243,'height':rowsOfCards * 122 + 100});
		//to be removed if a better way is found!
		var margin = 1000<(cardsPerRow * 122 +243)?(screen.width-(cardsPerRow * 122 + 243))/2:(screen.width-1000)/2;
		margin = margin>0?margin:0;
		$('body').css({'left': 0,'margin-left':(screen.width-(cardsPerRow * 122 + 243))/2});
		//-------------------------------------------------
		var titleWidth = $('#game_frame').width(); // header width
		$('#game_title_wrapper').width(titleWidth);		
        		cardsHidden = HideCards(noc);
        		addImages(noc,cardsPerRow);
		console.log(players)
		if(players[cp-1].ai){
			players[cp-1].turn();
		}
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
function setBack(again) {
	gameIsRunning = false;
	pairsFound = 0,cardsHidden = [];
	$('#game_board_frame').empty();
	if(!again){
		$('#game_info_frame').empty();
		players = [];
		cp = 1;
		botCounter = 1;// declared in ui.js
		possibleNums = [0,1,2,3];
		$('#game_info_frame').append('<ul id="sortable"><ul>');
		$('#sortable').append($('<div id="addPlayer" ></div>'));
		$('#addPlayer').append('<p><button id="human">Add Player</button></p>'); 
		$('#addPlayer').append('<p><button id="ai">Add AI</button></p>');

		aiLock = false;
		humanLock = false;
	}
	else{
		if(players.length<4){ //atm pointless as start is triggered short after this and removes it instantly
			$('#addPlayer').show();
		}
		$('.duringGame').hide();
		$('.delete').show();
		$('#sortable').sortable('enable');
	}
	
	
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
		var secsTaken = parseInt($('#min').text(), 10)*60 + parseInt($('#sec').text(), 10);
		console.log(secsTaken);
		var winner = "";
		var playerScore = 0;
		var highscore = 0;
		var highPoints = 0;

		for(var i=0;i<players.length;i++){ 
			playerScore = parseInt($('#player'+players[i].number+'_matched').html(), 10);
			if(highscore == playerScore){
					winner+= " and "+players[i].name;
			}
			if(highscore < playerScore){
					highscore = playerScore;
					winner = players[i].name;
					highPoints = parseInt($('#player'+players[i].number+'_points').html(), 10);
			}			
		}
		players.forEach(function(value,index){
			if(players[index].pairs == highscore){
				players[index].score++;
				$('#player'+players[index].number+'_score').html(" "+players[index].score);
			}	
		});
		var again = confirm('Congratulations, '+winner+'. You won with '+highscore+' pairs, and '+highPoints+' points!\nWould you like to play again?');
		setBack(again);
		if(again){ //Maybe mention pairs and turns
			var playerSet = confirm("Same Players?");
			players.forEach(function(value, index){
				players[index].turns = players[index].pairs = 0;//should work, if not 2 seperate lines
				$('#player'+players[index].number+'_matched').html(" 0");
				$('#player'+players[index].number+'_points').html(" 0");
				$('#player'+players[index].number+'_turns').html(" 0");	
			});
			cp=1;
			if(playerSet){			
				start();
			}	
		}
	}
}


var nextPlayer = function(){
    cp++;
    if (cp > players.length) { cp = 1;}
};

//---------------------------------------------------------- Players ------------------------------------------------------------------------------------

function Player(number,name){
	this.score = 0; //to keep track of total wins if player stay the same
	this.points = 0;
	this.number = number;
	this.name = name;
	this.turns =0;
	this.pairs = 0;
	this.ai = false;
	this.scoreMultiplier = 0;
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------- Artifical Intelligence (or at least a non-human opponent :D)  -------------------------------------
function AI(number,name){
	this.difficulty;
	this.name = name;
	this.number = number;
	this.ai = true;
	var queue = [];

	this.printQueue = function(){//just for debugging purpose
   	 var q = [];
    	for(var i=0;i<queue.length;i++){
        	q[i] = queue[i].getSrc();
    	}
    	return q;
	}
	
	this.forget = function(){ //the queue array is limited to the last e.g. 10 cards
    	if(queue.length>this.difficulty)
    	queue.shift();//shift deletes the 1st item of an array (and returns it)
    	//e.g. [1,2,3].shift() --> [2,3]
	};
	this.learn = function(input){
    	queue.push(input); //whenever a card is revealed store its position in queue
	};

	this.shuffle = function(){
		queue.sort(random);
	}

	this.check = function(){
    	for(var i=0;i<queue.length;i++){
        	for(var j = i+1;j<queue.length;j++){
            		if(queue[i].getSrc()== queue[j].getSrc()){
                		return this.found(i,j);
            		}
        	}
    	}
    	return false;
	};

	this.found = function(i,j){//deletes a pair when found
		var pair = [];		
 		pair.push(queue.splice(j,1)[0]);//j before i to keep the order in the array
    	pair.push(queue.splice(i,1)[0]);//splice returns the object in an array!!
    	return pair;    	
	};

	this.alreadyIn = function(card){ //check function to only store cards which aren't already in the queue
		for(var i in queue){
			if(queue[i].getNumber() == card.getNumber()){
				return true;
			}
		}
		return false;
	}

	this.turn = function(){
		this.printQueue();
		for(var i=queue.length-1;i>=0;i--){
			console.log(i+" "+queue.length);
			if(queue[i].fadedOut){
				queue.splice(i,1);
			}
		}
		this.printQueue();
		var last = -1;//non reachable start value
		for(var i=0;i<2;i++){
			var pair = this.check();
		    if(last!=-1 && pair/* && !pair[0].fadedOut*/){//if the 1st random draw hits a pair this should get it
				if(pair[0].getNumber() == last){
					//console.log("if "+ this.printQueue());					
					turn(pair[1].getNumber());
					//console.log("done");					
				}
				else{
					//console.log("if "+ this.printQueue());
					turn(pair[0].getNumber());
					//console.log("done");
				}
			}
			else if(pair/* && !pair[0].fadedOut*/){//needs to be 2nd as it triggers when the first case is triggered :(
				//console.log("pair "+this.printQueue());
				turn(pair[0].getNumber());
				turn(pair[1].getNumber());
				//console.log("done");
				return ;
			}			
			else{
				var rand;			
				do{
					rand = Math.floor(Math.random()*cardsHidden.length+1);
					//console.log("random "+rand+" "+this.printQueue());
				} while(cardsHidden[rand-1].fadedOut || this.alreadyIn(cardsHidden[rand-1]) ||rand == last); //rand == last because loser has no queue
				//console.log("almost");
				turn(rand);
				//console.log("done");
				last = rand;
			}
		}
	};
}

AI.prototype = new Player();

//-------------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){	
   	$("#start").click(start);
	$("#quit").click(function(){
			setBack();
	});
	$("#game_board_frame").html('<p style="font-size:30px;vertical-align:middle;text-align:center"><strong>Get your settings ready. Press start to begin!</strong></p>');
});

var turn = function(cid){ //cid means card_id and is number or a numerical string from "1" to "24" 
	console.log(cp+ " "+players[cp-1].number);
	var counter = hiddenCounter(cardsHidden);
	var id = cid;	
	var card = cardsHidden[id-1];
	if(counter<2 && !card.fadedOut){ 
       	$(card.getPlace()).attr("src", card.getSrc());
		card.hidden = false;		
		lock = false;
		players.forEach(function(value,index){
			if(players[index].ai && !players[index].alreadyIn(card)){
				players[index].learn(card);
				players[index].shuffle(); //to avoid that all bots have the same memory :D 
				players[index].forget();
			}
		});
	}
	if(hiddenCounter(cardsHidden) == 2 && !lock){ // or counter  == 2
		var array = [];
		var again = false;		
		console.log(players[cp-1].scoreMultiplier);
		players[cp-1].turns++;
        $('#player'+players[cp-1].number+'_turns').html(" "+players[cp-1].turns); 
		cardsHidden.forEach(function(value,index){
				if(!cardsHidden[index].hidden){
					array.push(cardsHidden[index]);	
				}
		});
		if(array[0].getSrc() ==array[1].getSrc()){      // if player made a match
			again = true;
			players[cp-1].scoreMultiplier++;
			players[cp-1].points += Math.pow(players[cp-1].scoreMultiplier,2)*10;
			$('#player'+players[cp-1].number+'_points').html(" "+players[cp-1].points); 
			console.log(players[cp-1].scoreMultiplier);
			players[cp-1].pairs++;
            $('#player'+players[cp-1].number+'_matched').html(" "+players[cp-1].pairs); 
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
				if (!debugMode) {
					$(".card_frame img").attr("src","Badges/"+upCard);	
				}		
				cardsHidden.forEach(function(value,index){
					cardsHidden[index].hidden = true;
				});
			},1000);
		}
		if(!again){
			players[cp-1].scoreMultiplier = 0;
        			nextPlayer();        	
		}
		lock = true;
		setTimeout(function(){
			if(players[cp-1].ai){
				players[cp-1].turn();
			}
		},1000);
		
	}
};
  


    //toggles between code.png and the hidden card
$(document).on('click',".card_frame",function(){
	if(!players[cp-1].ai){// to avoid clicks while AI's turns
		turn(this.id.split("card_").splice(1));
	}
});


