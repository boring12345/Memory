//------------------------------------- Adding Player GUI ------------------
var idCounter =0;
var botCounter = 1;
var playerCounter = 1
var possibleNums = [0,1,2,3];
//var aiLock = false;
//var humanLock = false;
var addPlayer = function(name,id){
		console.log("botCounter: "+botCounter);
		var playerNum = possibleNums.shift();
		console.log("playerNum: "+playerNum);
		console.log("possibleNums: "+possibleNums);
		if(name.split(" ")[0].toLowerCase()=="bot"){
			name = name.split(" ");
			name.shift();
			var difficulty = name[name.length-1];
			console.log(difficulty);
			if(name.length != 2 || name[1] == ""){
				if(name.length==1 && isNaN(name[0]) && isNaN(mode[name[0]])){
					name = name[0];
				}
				else{
					name = "Bot "+botCounter;
					botCounter++;
				}
				name+=(difficulty=="difficulty" || difficulty=="")?" (medium)":" ("+difficulty+")";
			}
			else{
				name = name[0]+" ("+difficulty+")";
			}
			players.push(new AI(playerNum+1,name));
			if(!isNaN(difficulty)){
				console.log(difficulty);
				players[players.length-1].difficulty = difficulty;
			}
			else {
				if(!isNaN(mode[difficulty])){
					players[players.length-1].difficulty = mode[difficulty];	
				}
				else{
					players[players.length-1].difficulty = 7;
					name = name.split(" ");
					name[name.length-1] = "(medium)";
					name = name.join(" ");
					players[players.length-1].name = name;	
				}				
			}
			$(/*'#addAI'*/'#'+id).remove();	
		}
		else{
			if(name == ""){
				name = "Player "+playerCounter;
				playerCounter++;
			}
			players.push(new Player(playerNum+1,name));
			$(/*'#addHuman'*/'#'+id).remove();
		}
        $('#sortable').append($('<div id="player' + (playerNum+1) + '_frame" class="player_frame">' + players[players.length-1/*playerNum*/].name + '</div>'));
        $('#player' + (playerNum+1) + '_frame').append('<div class="duringGame">Turns taken:<span id="player' +(playerNum+1)+ '_turns" </span></div>'); 
        $('#player' + (playerNum+1) + '_frame').append('<div class="duringGame">Pairs  Matched:<span id="player' +(playerNum+1)+ '_matched" </span></div>');
      	$('#player' + (playerNum+1) + '_frame').append('<div>Score:<span id="player' +(playerNum+1)+ '_score"> 0</span></div>'); 	
      	$('#player' + (playerNum+1) + '_frame').append('<div><button class="delete" value="Delete">Delete</button></div>');
		$('.duringGame').hide();
};

//-------- sortable -------
$(document).on('click','#human,#ai',function(){
	$("#sortable").sortable({"axis":"y"});
});

//------ disable sortable / sort players --------
function swap(){
	$('#sortable').sortable('disable');
	var id = [];	//frame id's
	var pi = [];	//players indices
	var so = [];	//starting order
	var pf = $('.player_frame').filter(function() {
        return this.id.match(/player._frame/);
    });
	for(var i=0;i<players.length;i++){
		id.push(parseInt(pf[i].id.match(/[1-4]/)[0],10)-1);
		pi.push(players[i].number);
	}
	for(i=0;i<players.length;i++){
		so[i] = pi.indexOf(i+1);
	}
	
	orderedArray= function(arr,order){
    	return  order.map(function(itm){return arr[itm];});
	};
	
	players = orderedArray(players,so);		//provides starting order 1,2,3,4
	players = orderedArray(players,id);		//changes to 'real' order
};

$(document).on('click','.delete',function(e){
	var toBeRemoved = $(this).closest('.player_frame').attr('id');
	console.log("toBeRemoved: "+toBeRemoved)
	var id = parseInt(toBeRemoved.match(/[1-4]/)[0],10)-1;
	possibleNums.unshift(id);
	console.log("possibleNums: "+possibleNums);
	for(var i=0;i<players.length;i++){
		if(players[i].number == (id+1)){
			var index = i;
			break;
		}
	}
	console.log("Index: "+index);
	players.splice(index,1);
	console.log(players)
	$('#'+toBeRemoved).remove();
	$('#addPlayer').show();
	e.preventDefault();
});


//--------------------------------
$(document).on('submit','#humanName',function(e){//act like delegate()
	var name = $('#humanName input:first-child').val();
	name = (name.toLowerCase()!="bot")?name:"default";
	addPlayer(name,$(this).closest('div').attr('id'));
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
		name = 'bot '+$('#aiDifficulty input:first-child').val()+' '+$('#difficulty').val();
	}
	console.log(name);
	addPlayer(name,$(this).closest('div').attr('id'));
	aiLock = false;
	e.preventDefault();
});

$(document).on('click','#human',function(){//act like delegate()
//	if(!humanLock){
		$('#addPlayer').before($('<div/>').addClass('player_frame').attr('id','addHuman'+idCounter));//'<div id="addHuman" class="player_frame"></div>');
		$('#addHuman'+idCounter).append('Please insert your name<form id="humanName"><div><input type="text" /><input type="submit" value="create your Player" /></div>');
		idCounter++;
		if(frames = $('.player_frame').length >=4){
			$('#addPlayer').hide();	//hidden instead of remove !?	
		}
//		humanLock = true;
//	}
});

$(document).on('click','#ai',function(){//act like delegate()
//	if(!aiLock){
		$('#addPlayer').before($('<div/>').addClass('player_frame').attr('id','addAI'+idCounter));//'<div id="addAI" class="player_frame"></div>');
		var toAppend='<div><label>Difficulty:</label><select id="difficulty"><option value="loser">loser</option><option value="easy">easy</option><option value="medium" selected>medium</option><option value="hard">hard</option><option value="impossible">impossible</option><option value="insane">insane</option><option value="custom">custom</option></select></div>'; 
		$('#addAI'+idCounter).append('<form id="aiDifficulty">'+toAppend+'<div><input type="text" value="name and/or difficulty" /><input type="submit" value="create a bot" /></div>');
		idCounter++;
		if(frames = $('.player_frame').length >=4){
			$('#addPlayer').hide(); //hidden instead of remove !?		
		}
//		aiLock = true;
//	}	
});

$(document).ready(function(){
	$('#game_info_frame').append($('<ul/>').attr('id','sortable'));//'<ul id="sortable"><ul>');
	$('#sortable').append($('<div id="addPlayer"></div>'));
	$('#addPlayer').append('<p><button id="human">Add Player</button></p>'); 
	$('#addPlayer').append('<p><button id="ai">Add AI</button></p>');
		
});	

