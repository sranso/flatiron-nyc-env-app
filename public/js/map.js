//initialize map
var map;
var markers = {};

function initialize() {
  geocoder = new google.maps.Geocoder();

  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(40.6700, -73.9400)
  };

  // create that map
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

// Add a marker to the map and push to the array.
function addMarker(location, objectName ) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers[objectName].push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(objectName) {
  for (var i = 0; i < markers[objectName].length; i++) {
    markers[objectName][i].setMap(null);
  };
}

// load the map
google.maps.event.addDomListener(window, 'load', initialize);

// click event, when a checkbox is clicked
$('.data-set-class').click(function() {
  var $this = $(this);
  // get JSON file name
  var dataName = $this.parent("label").text();
  var fileName = "data/" + dataName.replace(/ /g, "-") + ".json";
  
  function objectName() {
    return dataName.replace(/ /g, "");
  }
  if (markers[objectName()] === undefined) {markers[objectName()] = [];};
  
  if ($this.hasClass("selected")) {
    $this.removeClass("selected");
    clearMarkers(objectName());
  } else {
    $this.addClass("selected");
    if (fileName == "data/NYC-Cool-Roofs-Buildings.json") {
      $.getJSON(fileName, function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var newLatLon = new google.maps.LatLng(response.data[i][13][1], response.data[i][13][2])
          addMarker(newLatLon, objectName());
        };
      });
    } else if (fileName == "data/Food-Scraps.json") {
      $.getJSON(fileName, function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var newLatLon = new google.maps.LatLng(response.data[i][10][1], response.data[i][10][2])
          addMarker(newLatLon, objectName());
        };
      });
    }
    
  };
  
  
});