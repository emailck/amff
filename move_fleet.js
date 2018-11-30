// ==UserScript==
// @name         AMF
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto to move fleets
// @author       You
// @match        http://*.astroempires.com/*
// @grant        none
// @require https://cdn.astroempires.com/javascript/js_move_v1.5.js
// ==/UserScript==

function onClick() {
    //move(flee id, "destination");
    move(1440, "T28:45:87:10");
    move(2336, "T28:45:87:10");
    move(9360, "T28:45:87:10");
    move(28028, "T28:45:87:10");
}

function move(fleet, destination) {
    $.get("fleet.aspx?fleet=" + fleet + "&view=move", function(data, status) {
        var div = document.createElement('div');
        div.style.display = "none";
        document.body.appendChild(div);
        div.innerHTML = data;
        var units = $(div).find("#units").val().split(',');
        console.log(units);
        if (units.length <= 0) {
            return;
        }
        for (var i = 0; i < units.length; i++) {
            maxquant(units[i]);
        }
        try {
            fill_hangar("Fighters");
        } catch (error) {
        }
        $(div).find("#destination").val(destination);
        $(div).find("#move_fleet_form").submit(function(e) {
            var form = $(this);
            $.post(form.attr('action'), form.serialize(), function(){
                console.log(fleet + '---->' + destination);
                //$("div" + fleet).remove();
            });
            /*
            $.ajax({
                type: "POST",
                url: form.attr('action'),
                data: form.serialize(), // serializes the form's elements.
                success: function(data)
                {
                    console.log("success"); // show response from the php script.
                    //$(div).remove();
                },
                error: function (data) {
                    console.log('An error occurred.');
                    //$(div).remove();
                }
            });
            */
            $(div).remove();
            e.preventDefault(); // avoid to execute the actual submit of the form.
        });
        $(div).find("#move_fleet_form").submit();
    });
}

(function() {
    'use strict';
    $(document.body).append('<button id="auto-move" class="input-button">移动</button>');
    $("#auto-move").
    $("#auto-move").click(onClick);
    // Your code here...
})();
