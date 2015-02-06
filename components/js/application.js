var jsonData;

$(document).ready(function () {

    $.getJSON("participating-schools.json", function(data) {
        jsonData = data;
    });


    // AJAX call to get the statemaps into the DOM from stateMaps.html

    $.ajax({
        url: "stateMaps.html",
        cache: false
    })
        .done(function( html ) {
            $( "#state" ).append( html );
        });

    // On state click load data from .json into #data and map svg from stateMaps.html into #state

    $( ".state" ).on( "click", function() {
        var state     = this,
            stateID   = state.id,
            stateData = $("#data"),
            stateMap = $("#state"),
            stateName = $("#stateName"),
            stateMapContents = $('#' + stateID + '-enlarge');

        stateMapContents.removeClass("hide");
        stateMap.append(stateMapContents);

        //Dialog to hold contents after click

        $( "#dialog" ).on( "click", function() {
            $('#dialog').removeClass('active');
            $("#data").empty();
            stateMapContents.addClass("hide");
        });

        $('#dialog').addClass('active');

        // AJAX call to get the participating-schools.json into the DOM
        if (jsonData[stateID].length > 0 ) {
            $.each(jsonData[stateID], function (key, value) {
                var schoolID = ('<span>' + value.schoolId + '</span>');
                var stateSchoolName = ('<h2>' + value.schoolName + '</h2>');
                var stateSchoolState = ('<p>' + value.schoolState + '</p>');
                var stateSchoolUrl = ('<a href="' + value.schoolUrl + '"' + ' target="blank">' + value.schoolUrl + '</a>');
                stateData.append('<li>' + schoolID + stateSchoolName + stateSchoolState + stateSchoolUrl + '</li>');
                stateName.html(stateSchoolState);
            });
        } else {
            stateData.append('<li>' + 'no schools available.' + '</li>');
        }
        liHover();

    });

    //Code for the counter widget

    $( ".state" ).mouseenter ( function() {
        var state          = this,
            counter    = $('#counter'),
            stateID    = state.id,
            collegeCount = jsonData[stateID].length,
            displayColleges = "college",
            displayCount = collegeCount;

        if (collegeCount == 0) {
            displayCount = "no";
            $(this).unbind('click');
        }

        if (collegeCount != 1) {
            displayColleges = displayColleges + "s";
        }

        counter.html(stateID + ' has ' + displayCount + " " + displayColleges + ".");

    });

    $( ".state" ).mouseleave ( function() {
        var state   = this,
            counter   = $('#counter'),
            data      = $("#data li").length;

        counter.html('');
    });

    var liHover = function () {
        $("#data li").mouseenter(function() {
            var id = $(this).index() + 1;
            $('#colleges g').children().filter(function() {return ($(this)[0].textContent==id);}).attr("fill", "#ffffff").prev().attr("fill", "#1f4469");
        });

        $("#data li").mouseleave(function() {
            var id = $(this).index();
            $('#colleges g').children().attr("fill", "#000000").prev().attr("fill", "#FFFFFF");
        });
    };
});