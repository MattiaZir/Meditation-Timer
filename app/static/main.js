var hoursDiv,
    minutesDiv,
    secondsDiv,
    btnStart,
    stoppauseControl,
    controlsDiv,
    interval;

// FIXME: Memory leak
$(document).ready(function () {
    hoursDiv = $("#hours");
    minutesDiv = $("#minutes");
    secondsDiv = $("#seconds");
    btnStart = $("#btn-start");
    stoppauseControl = $("#stoppause-control");
    controlsDiv = $(".controls");

    $("#add-hours, #add-minutes, #add-seconds, \
    #subtract-hours, #subtract-minutes, #subtract-seconds").mousedown(function(event) {
        controlClickHandler(this);
    });

    btnStart.click(startTimer);
    $("#btn-stop").click(function() {
        stopTimer();
    });

});

function controlClickHandler(clickedElement) {
    /* this regex deletes everything before the character '-' (included)
    * So it leaves only the element that has to be modified by the method */
    var element = '#' + clickedElement.id.replace(new RegExp(".+-"), "");
    /* this regex deletes everything after the character '-' (included)
    * so that it leaves only the operation that the method needs to perform */
    var operation = clickedElement.id.replace(new RegExp("-.+"), "");

    (operation === "add") ? performOperation(element, true) : performOperation(element, false);
}

function performOperation(element, increasing) {
    var maxValues = {"#hours": 24, "#minutes": 59, "#seconds": 59};
    var time = $(element).html();

    if(increasing && (time < maxValues[element])) {
        time++;
    }
    else if(time > 0) {
        time--;
    }

    $(element).html(pad(time));
}
// function to pad the number
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function startTimer() {
    var hours = parseInt(hoursDiv.html()),
        minutes = parseInt(minutesDiv.html()),
        seconds = parseInt(secondsDiv.html());
        milliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        if(milliseconds > 0) {
            toggleButtonsDisplay();
            countdown(milliseconds);
        }
}

function countdown(milliseconds) {

    interval = setInterval(function() {
        if(milliseconds <= 0) {
            stopTimer();
        } else {
            checkDigits();
            milliseconds -= 1000;
        }
    }, 1000);
}

function checkDigits() {
    var hours = parseInt(hoursDiv.html()),
        minutes = parseInt(minutesDiv.html()),
        seconds = parseInt(secondsDiv.html());

    if(seconds === 0 && minutes > 0) {
        performOperation(minutesDiv, false);
        secondsDiv.html(59);
    } else if(seconds === 0 && minutes === 0) {
        performOperation(hoursDiv, false);
        minutesDiv.html(59);
        secondsDiv.html(59);
    } else {
        performOperation(secondsDiv, false);
    }
}

function toggleButtonsDisplay() {
    btnStart.toggle();
    stoppauseControl.toggle();
    controlsDiv.toggle();
}

function stopTimer() {
    clearInterval(interval);
    toggleButtonsDisplay();
}
