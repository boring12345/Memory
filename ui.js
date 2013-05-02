//------------------------------------- Adding Player GUI ------------------
var botCounter = 1;
var playerCounter = 0;
var aiLock = false;
var humanLock = false;
var addPlayer = function(name){ //back-up
		//var name = prompt("Please insert your name or 'bot' to add a non-human opponent");		
		if(name.split(" ")[0].toLowerCase()=="bot"){
			var difficulty = name.split(" ")[1];
			name = "Bot "+botCounter +" ("+difficulty+")";
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
        $('#sortable').append($('<div id="player' + (playerCounter+1) + '_frame" class="player_frame">' + players[playerCounter].name + '</div>'));
        $('#player' + (playerCounter+1) + '_frame').append('<br>Turns taken:<span id="player' +(playerCounter+1)+ '_turns" </span>'); 
        $('#player' + (playerCounter+1) + '_frame').append('<br>Pairs Matched:<span id="player' +(playerCounter+1)+ '_matched" </span>');
      	$('#player' + (playerCounter+1) + '_frame').append('<br>Score:<span id="player' +(playerCounter+1)+ '_score" </span>'); 	
 	playerCounter++;        
};

//-------- sortable -------
$(document).on('click','#human,#ai',function(){
	$("#sortable").sortable({"axis":"y"});
});

//------ disable sortable / sort players --------
function swap(){
	var swap;
	var count =0;
	var sub = "";	
	$('#sortable').sortable('disable');
	var pf = $('.player_frame');
	for(id in pf){
		var getId = pf[id].id;
		if(getId){
			sub = getId.substring(6,7);
			if(sub != players[count].number){
				swap = players[count];
				players[count]=players[sub-1];
				players[sub-1]=swap;
			}
			console.log(players[count]);
			count++;
		}
	}
};

//--------------------------------
$(document).on('submit','#humanName',function(e){//act like delegate()
	var name = $('#humanName input:first-child').val();
	name = (name.toLowerCase()!="bot")?name:"default";
	addPlayer(name);
	humanLock = false;
	e.preventDefault();
	//return false;	
});

$(document).on('submit','#aiDifficulty',function(e){//act like delegate()
	var name;
	if($('#difficulty').val() == "custom"){
		name = 'bot ' +$('#aiDifficulty input:first-child').val();		
	}
	else{
		name = 'bot '+$('#difficulty').val();
	}
	console.log(name);
	addPlayer(name);
	aiLock = false;
	e.preventDefault();
});

$(document).on('click','#human',function(){//act like delegate()
	if(!humanLock){
		$('#addPlayer').before('<div id="addHuman" class="player_frame"></div>');
		$('#addHuman').append('Please insert your name<form id="humanName"><div><input type="text" /><input type="submit" value="create your Player" /></div>');
		if(frames = $('.player_frame').length >=4){
			$('#addPlayer').remove();		
		}
		humanLock = true;
	}
});

$(document).on('click','#ai',function(){//act like delegate()
	if(!aiLock){
		$('#addPlayer').before('<div id="addAI" class="player_frame"></div>');
		var toAppend='<div><label>Difficulty:</label><select id="difficulty"><option value="looser">looser</option><option value="easy">easy</option><option value="medium" selected>medium</option><option value="hard">hard</option><option value="impossible">impossible</option><option value="insane">insane</option><option value="custom">custom</option></select></div>'; 
		$('#addAI').append('<form id="aiDifficulty">'+toAppend+'<div><input type="text" value="custom difficulty" /><input type="submit" value="create a bot" /></div>');
		if(frames = $('.player_frame').length >=4){
			$('#addPlayer').remove();		
		}
		aiLock = true;
	}	
});

$(document).ready(function(){
	$('#game_info_frame').append('<ul id="sortable"><ul>');
	$('#sortable').append($('<div id="addPlayer"></div>'));
	$('#addPlayer').append('<p><button id="human">Add Player</button></p>'); 
	$('#addPlayer').append('<p><button id="ai">Add AI</button></p>');
		
});	

