$(document).ready(function () {

    $("#add-hours, #add-minutes, #add-seconds,\
    #subtract-hours, #subtract-minutes, #subtract-seconds").mousedown(function(event) {
        controlClickHandler(this);
    });
    $("#btn-start").click(startTimer);

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

    if(increasing) {
        if(time < maxValues[element]) {
            time++
        }
    } else {
        if(time > 0) {
            time--
        }
    }

    $(element).html(pad(time));
}
// function to pad the number
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
function startTimer() {
    var hours = parseInt($("#hours").html()),
        minutes = parseInt($("#minutes").html()),
        seconds = parseInt($("#seconds").html());
        milliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        countdown(milliseconds);
}
function countdown(milliseconds) {
    var interval = setInterval(function() {
        if(milliseconds <= 0) {
            clearInterval(interval);
        } else {
            checkDigits();
            milliseconds -= 1000
        }
    }, 1000);
}

function checkDigits() {
    var hoursDiv = $("#hours"),
        minutesDiv = $("#minutes"),
        secondsDiv = $("#seconds"),
        hours = parseInt(hoursDiv.html()),
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
