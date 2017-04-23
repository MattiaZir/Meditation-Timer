$(document).ready(function () {

    $("#add-hours").click({param1: "#hours", param2: true}, controlClickHandler);
    $("#add-mins").click({param1: "#minutes", param2: true}, controlClickHandler);
    $("#add-secs").click({param1: "#seconds", param2: true}, controlClickHandler);
    $("#subtract-hours").click({param1: "#hours", param2: false}, controlClickHandler);
    $("#subtract-mins").click({param1: "#minutes", param2: false}, controlClickHandler);
    $("#subtract-secs").click({param1: "#seconds", param2: false}, controlClickHandler);

});

function controlClickHandler(event) {
    var element = event.data.param1;
    var isIncreasing = event.data.param2;
    var time = $(element).html();
    var maxValues = {"#hours": 24, "#minutes": 59, "#seconds": 59};

    if(isIncreasing) {
        if(time < maxValues[element]) {
            if(element !== "#hours")
            {

            }
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

    $(element).html(time);
}
