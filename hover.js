    $( ".state" ).on( "hover", function() {
      var state     = this, 
          stateID   = state.id,
          stateCount = $("#state-count");

      $.getJSON("participating-schools.json", function(data) {
        $.each(data[stateID], function (key, value) {
          stateData.append('<p>' + value.schoolName + '</p>');
          stateData.append('<p>' + value.schoolStateAbbreviation + '</p>');
          stateData.append('<p>' + value.schoolState + '</p>');
          stateData.append('<a href="' + value.schoolUrl + '"' + ' target="blank">' + value.schoolUrl + '</a>');
          stateData.append('</br>');
        });

    });