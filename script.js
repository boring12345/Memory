// Global variables
var array = [], // The array of images
    minID, secID, msID; // The unique IDs of setInterval

// Used for sorting array randomly
var random = function() {
    return Math.random() - 0.5;
};

// Returns time passed in mini-seconds
var getTime = function() {
    var min = +$('#min').text();
    var sec = +$('#sec').text();
    var ms = +$('#ms').text();
    alert(6000 * min + 100 * sec + ms);
    return 6000 * min + 100 * sec + ms;
};

// Starts the minutes of the clock
var startMin = function() {
    minID = setInterval(function(){
        var previous = +$('#min').text();
        var next = previous === 59 ? 0 : previous + 1;
        $('#min').text(next > 9 ? next : '0' + next);
        if (next === 60)
            // endGame();
            alert('Game Over!');
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

// Starts the mini-seconds of the clock
var startMS = function() {
    msID = setInterval(function(){
        var previous = +$('#ms').text();
        var next = previous === 99 ? '0' : previous + 1;
        $('#ms').text(next > 9 ? next : '0' + next);
    }, 10);
};

// Stops clock and sets time to 0
var stopClock = function() {
    $('#min').text('0'), clearInterval(minID);
    $('#sec').text('00'), clearInterval(secID);
    $('#ms').text('00'), clearInterval(msID);
};

// Optional parameter, if true, stops the clock
var startClock = function(bool) {
    if (bool)
        stopClock();
    startMS(), startSec(), startMin();
};