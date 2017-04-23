$(document).ready(function () {

    $("#add-hours, #add-minutes, #add-seconds,\
    #subtract-hours, #subtract-minutes, #subtract-seconds").click(function(event) {
        controlClickHandler(this);
    });

});

function controlClickHandler(clickedElement) {
    /* this regex deletes everything before the character '-' (included)
    * So it leaves only the element that has to be modified by the method */
    var element = '#' + clickedElement.id.replace(new RegExp(".+-"), "");
    /* this regex deletes everything after the character '-' (included)
    * so that it leaves only the operation that the method needs to perform */
    var operation = clickedElement.id.replace(new RegExp("-.+"), "");
    var time = $(element).html();

    $(element).html(performOperation(element, time, operation));
}

function performOperation(element, time, operation) {
    var maxValues = {"#hours": 24, "#minutes": 59, "#seconds": 59};

    if(operation === "add") {
        if(time < maxValues[element]) {
            time++;
        }
    } else {
        if(time > 0) {
            time--;
        }
    }

    if(time < 10) {
        if(time > 0) {
            time = '0' + time;
        } else {
            time = "00";
        }
    }

    return time;
}
