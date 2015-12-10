
// The first line here loads the data in the building-centroids GeoJSON file
$.getJSON("https://cdn.rawgit.com/pennstategeog467/campus-map/gh-pages/data/building-centroids.json", function(centroids) {

  $.getJSON("https://rawgit.com/wdc5041/campus-map/gh-pages/data/searchbarv3.json", function (data) {

    console.log("centroids:");
    console.log(centroids);
    console.log("data:");
    console.log(data);

  // Because everything we do after this depends on the JSON file being loaded, the above line waits for the JSON file to be loaded,
  // then the browser will proceed with the below code. The data from the JSON file is the variable `centroids`.

  function getBuildings(value) {
    var api = 'https://apps.opp.psu.edu/fis-api/v1/buildings?name:ilike=*';
    $.getJSON(api + value + '*', function(data) {

      var searchResults = [];

      data.map(function(d) {
        searchResults.push({
          'category': d.college,
          'label': d.name,
          'id': d.id,
          'latLong': d.latLong
        });
      });

    })
  }

  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

  // Setting up the search bar behavior with jQuery UI Autocomplete
  $(function() {

    $("#search").catcomplete({
        source: data, //!!Change availableTags to Database Json file!!! The list of tags for the autocomplete is availableTags.
        minLength: 2, // Give autocomplete suggestions after two letters are typed
        autoFocus: true,
        select: function (event, ui) { // An event listener that does the following code once an option from the autocomplete menu is selected
            setTimeout(focusMap, 50); // When an option is selected, zoom to that point. The focusMap function is definded below.
        },
        search: function () {
          this.source = getBuildings(this.value);
        }
    });
  });

  // Defining a function that automatically zooms the map to the feature with the same title as whatever's in the search field.
  function focusMap() {

    var targetName = document.getElementById('search').value; // Gets whatever text the user has entered into the search field.


    // For each of the centroids points, check if the title matches our target, and if it does,
    // break out of the loop and set the map view to that point,
    // then filter our markers feature layer so that only the target point is showing.

    for (var i = 0; i < data.length; i++) { // Initialize the for loop
      if (data[i].label === targetName) { // For each point, check if the title of the point matches the target
        var targetID = data[i]["PICTURE ID"]; // Remembers whichever building id it was that matches for use later.
        break; // Skip the rest of the loop, we already found what we wanted.
      } else {
        console.log('not found'); // If we don't find it, and this should never happen, write in the console that we didn't find it.
      }
    }

    for (var i = 0; i < centroids.features.length; i++) { // Initialize the for loop
      if (centroids.features[i].properties.building_id == targetID) { // For each point, check if the title of the point matches the target
        var targetPointIndex = i; // Remembers whichever building id it was that matches for use later.
        break; // Skip the rest of the loop, we already found what we wanted.
      } else {
        console.log('not found'); // If we don't find it, and this should never happen, write in the console that we didn't find it.
      }
    }

    targetLat = centroids.features[targetPointIndex].geometry.coordinates[1];
    targetLon = centroids.features[targetPointIndex].geometry.coordinates[0];

    console.log(targetLon, targetLat);
    map.flyTo({ center: [targetLon, targetLat], zoom: 18, curve: 1.2, speed: 0.6 });

    // Change the map view to the coordinates of the target point.


  }
});
});
