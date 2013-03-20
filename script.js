//------------------------------------ Global variables-------------------------------
// Is there a way to avoid such things?
    var cardsHidden = [];
    var pairsFound = 0;
    var noc = 12; // number of cards
    var nop = 4  //number of players

/*--------------------------------------Clock (not used yet)--------------------------- 
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
*/

//********************************************** Building the game frame **************************************************************
// To add players using jQuery
var addPlayers = function() {
    for (var i = 1; i < nop+1; i += 1)
        $('#game_info_frame').append($('<div id="player' + i + '_frame" class="player_frame">Player ' + i + '</div>'));
};

// To add images using jQuery
var addImages = function() {
    $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    for (var i = 1; i < 2*noc+1; i++) {
        var div = '<div id="card_' + i + '" class="card_frame"><a target="_blank"><img src="badges/code.png" alt="code"></a></div>';
        $('#game_board_frame').append($(div));
        if (i % 6 === 0)
            $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    }
};
//+++++++++++++++++++++++++++++++++++++++++++ Preparing the cards ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//------------------------------------------- Image Constructor ---------------------------------------------------------------------- 
function Image(number,src){
	this.id = "#card_"+number; //id of the card_frame
    this.getSrc = function(){ 
        return "badges/"+src;
    }
    this.getPlace =  function(){ //the image inside the card_frame of id 
        return this.id+ " img";
    }
    this.hidden = true; 
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
function HideCards(){
    var cards = ["23andmeAPI.png", "AddressBook.png", "BitlyAPI.png", "Blackjack.png", "Blackjack2.png", "Blackjack3.png", "BoxAPI.png", "CashRegister.png"/*, "Code.png"*/,
    "DiceGame.png", "DiceGame2.png", "DwollaAPI.png", "EasyPostAPI.png", "Fifty.png", "FireBaseAPI.png", "First.png", "FiveHundred.png", "FizzBuzz.png", "WePayAPI.png",
    "FizzBuzz2.png", "Functions.png", "HelloNewYork.png", "HTML5.png", "IfElse.png", "IntroObjects.png", "IntroObjects2.png", "JavascriptAPI.png", "YouTubeAPI.png",
    "JavascriptIntro.png", "JQuery.png", "KittenAPI.png", "LoyaltyAPI.png", "MandrillAPI.png", "MashapeAPI.png", "OAuth2API.png", "Olympics.png", "OneHundred.png",
    "OneThousand.png", "OrderInAPI.png", "ParseAPI.png", "PHP.png", "Primitives.png", "Python.png", "PythonAPI.png", "ReviewFunctions.png", "Ruby.png", "RubyAPI.png",
    "SendGridAPI.png", "SkyDriveAPI.png", "SoundCloudAPI.png", "Startup.png", "Ten.png", "TwentyFive.png", "TwilioAPI.png", "TwitterAPI.png", "TwoHundred.png"]; 
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

function reset(){// Game over!?
	if(pairsFound == 12){
		if(confirm('Congratulations! You won.\nWould you like to play again?')){
    		pairsFound = 0,cardsHidden = [];
		   	$('#game_board_frame').empty()
			addImages();
			alert("press start to play again");
		}
	}
}
//-------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){
	addImages();
	addPlayers();
    //get new Cards by pressing start button    
    $("#start").click(function(){
        cardsHidden = HideCards(); 
    });
	alert("press start");
});
  


    //toggles between code.png and the hidden card
$(document).on('click',".card_frame",function(){
	var counter = hiddenCounter(cardsHidden);
	var id = this.id.split("card_").splice(1);
	var card = cardsHidden[id-1];
    if(counter<2){ 
       	$(card.getPlace()).attr("src", card.getSrc());
		card.hidden = false;
	}
	if(hiddenCounter(cardsHidden)== 2){
		var array = [];
		cardsHidden.forEach(function(value,index){
				if(!cardsHidden[index].hidden){
					array.push(cardsHidden[index]);	
				}
		});
		if(array[0].getSrc() ==array[1].getSrc()){
			$(array[0].id).hide(250); //what's best to remove them? Maybe add a class and vanish via css to keep the order?
			$(array[1].id).hide(250);
			pairsFound++; // Why is this triggered if you click too fast?
			reset();
		}
		setTimeout(function(){
			$(".card_frame img").attr("src","badges/code.png");			
			cardsHidden.forEach(function(value,index){
				cardsHidden[index].hidden = true;
			});
		},800);
	}
});

