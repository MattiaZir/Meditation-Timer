// VARIABLES DECLARATION
var hoursDiv,
minutesDiv,
secondsDiv,
btnStart,
btnPause,
stoppauseControl,
controlsDiv,
interval,
paused,
timerEnd;

// DOCUMENT READY
$(document).ready(function() {
    hoursDiv = $("#hours");
    minutesDiv = $("#minutes");
    secondsDiv = $("#seconds");
    btnStart = $("#btn-start");
    btnPause = $("#btn-pause");
    stoppauseControl = $("#stoppause-control");
    timerEnd = $("#timer-end");
    controlsDiv = $(".controls");
    paused = false;

    $(".btn-control").mousedown(function(event) {
        controlClickHandler(this);
    });

    btnStart.click(startTimer);
    $("#btn-stop").click(stopTimer);
    btnPause.click(pauseToggle);
});

// FUNCTIONS
function controlClickHandler(clickedElement) {
    /* this regex deletes everything before the character '-' (included)
    * So it leaves only the element that has to be modified by the method */
    var element = "#" + clickedElement.id.replace(new RegExp(".+-"), "");
    /* this regex deletes everything after the character '-' (included)
    * so that it leaves only the operation that the method needs to perform */
    var operation = clickedElement.id.replace(new RegExp("-.+"), "");
    var htmlElement = element,
    increasing = operation === "add" ? true : false,
    time = $(element).html();

    performOperation(htmlElement, increasing, time);
}

function performOperation(element, increasing, time) {
    var tmp = time;

    increasing
    ? (tmp = increaseTimer(element, time))
    : (tmp = decreaseTimer(time));

    $(element).html(pad(tmp));
}
// function to pad the number
function pad(n) {
    return n < 10 ? "0" + n : n;
}

function startTimer() {
    var hours = parseInt(hoursDiv.html()),
    minutes = parseInt(minutesDiv.html()),
    seconds = parseInt(secondsDiv.html());
    milliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;

    if (milliseconds > 0) {
        toggleButtonsDisplay();
        countdown(milliseconds);
    }
}

function countdown(milliseconds) {
    interval = setInterval(function() {
        if (milliseconds <= 0) {
            timerEnd.trigger("play");
            stopTimer();
        } else {
            if (!paused) {
                checkDigits();
                milliseconds -= 1000;
            }
        }
    }, 1000);
}

function checkDigits() {
    var hours = parseInt(hoursDiv.html()),
    minutes = parseInt(minutesDiv.html()),
    seconds = parseInt(secondsDiv.html());

    if (seconds === 0 && minutes > 0) {
        performOperation("#minutes", false, minutes);
        secondsDiv.html(59);
    } else if (seconds === 0 && minutes === 0) {
        performOperation("#hours", false, hours);
        minutesDiv.html(59);
        secondsDiv.html(59);
    } else {
        performOperation("#seconds", false, seconds);
    }
}

function toggleButtonsDisplay() {
    btnStart.toggle();
    stoppauseControl.toggle();
    controlsDiv.toggle();
}

function stopTimer() {
    resetTimer();
    clearInterval(interval);
    toggleButtonsDisplay();
}

function pauseToggle() {
    if(!paused) {
        paused = true;
        btnPause.html("RESUME");
    } else {
        paused = false;
        btnPause.html("PAUSE");
    }
}

function isTimeInBounds(htmlElement, time) {
    var maxValues = { "#hours": 24, "#minutes": 59, "#seconds": 59 };

    if (time < maxValues[htmlElement]) {
        if (htmlElement != "#hours" && hoursDiv.html() == 24) {
            // if the timer is already at 24 hours, it doesn't increase anymore
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function increaseTimer(htmlElement, time) {
    if (isTimeInBounds(htmlElement, time)) {
        return parseInt(time) + 1;
    }
}

function decreaseTimer(time) {
    if (time > 0) {
        return parseInt(time) - 1;
    }
}

function resetTimer() {
    hoursDiv.html("00");
    minutesDiv.html("00");
    secondsDiv.html("00");

    btnPause.html("PAUSE");
    paused = false;
}
