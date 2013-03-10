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
    for (var i = 1; i < 25; i += 1) {
        var div = '<div id="card_' + i + '" class="card_frame"><a target="_blank"><img src="badges/code.png" alt="code"></a></div>';
        $('#game_board_frame').append($(div));
        if (i % 6 === 0)
            $('#game_board_frame').append($('<div class="game_board_spacer"></div>'))
    }
};

$(document).ready(function(){
    addPlayers();
    addImages();    
});
