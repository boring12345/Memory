//------------------------------------- Adding Player GUI ------------------
var botCounter = 1;
var playerCounter = 0;
var addPlayer = function(name) { //back-up
		//var name = prompt("Please insert your name or 'bot' to add a non-human opponent");		
		if(name.split(" ")[0].toLowerCase()=="bot"){
			var difficulty = name.split(" ")[1];
			name = "Bot "+botCounter;
			players[playerCounter] = new AI(playerCounter+1,name);
			if(!isNaN(difficulty)){
				console.log(difficulty);
				players[playerCounter].difficulty = difficulty;
			}
			else {
				if(!isNaN(mode[difficulty])){
					players[playerCounter].difficulty = mode[difficulty];	
				}
				else{
					players[playerCounter].difficulty = 7;	
				}				
			}
			botCounter++;
			$('#addAI').remove();	
		}
		else{
			players[playerCounter] = new Player(playerCounter+1,name);
			$('#addHuman').remove();
		}
        $('#game_info_frame').append($('<div id="player' + (playerCounter+1) + '_frame" class="player_frame">' + players[playerCounter].name + '</div>'));
        $('#player' + (playerCounter+1) + '_frame').append('<br>Turns taken:<span id="player' +(playerCounter+1)+ '_turns" </span>'); 
        $('#player' + (playerCounter+1) + '_frame').append('<br>Pairs Matched:<span id="player' +(playerCounter+1)+ '_matched" </span>'); 
 	playerCounter++;
	
        
};

$(document).on('submit','#humanName',function(e){
	var name = $('#humanName input:first-child').val();
	addPlayer(name);
	if(frames = $('.player_frame').length >=5){
		$('#addPlayer').remove();		
	}
	e.preventDefault();
	//return false;	
});

$(document).on('submit','#aiDifficulty',function(e){
	var name;
	if($('#difficulty').val() == "custom"){
		name = 'bot ' +$('#aiDifficulty input:first-child').val();		
	}
	else{
		name = 'bot '+$('#difficulty').val();
	}
	if(frames = $('.player_frame').length >=5){
		$('#addPlayer').remove();		
	}
	console.log(name);
	addPlayer(name);
	e.preventDefault();
});

$(document).on('click','#human',function(){
	$('#addPlayer').before('<div id="addHuman" class="player_frame"></div>');
	$('#addHuman').append('Please insert your name<form id="humanName"><div><input type="text" /><input type="submit" /></div>');
});

$(document).on('click','#ai',function(){
	$('#addPlayer').before('<div id="addAI" class="player_frame"></div>');
	var toAppend='<div><label>Difficulty:</label><select id="difficulty"><option value="looser">looser</option><option value="easy">easy</option><option value="medium" selected>medium</option><option value="hard">hard</option><option value="impossible">impossible</option><option value="insane">insane</option><option value="custom">custom</option></select></div>'; 
	$('#addAI').append('<form id="aiDifficulty">'+toAppend+'<div><input type="text" /><input type="submit" /></div>');	
});

$(document).ready(function(){
	$('#game_info_frame').append($('<div id="addPlayer" class="player_frame"></div>'));
	$('#addPlayer').append('<p><button id="human">Add Player</button></p>'); 
	$('#addPlayer').append('<p><button id="ai">Add AI</button></p>');
});	
