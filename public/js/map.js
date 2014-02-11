var map;
function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(40.6700, -73.9400)
  };

  // create that map
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // set content of pop-up box
  var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' +
      // placeName +
      '</h1>' +
      '<div id="bodyContent">' +
      '<p><b>' +
      // placeStreet + placeStreet2 +
      '</b>, also referred to as...</p>' +
      '<p><a href="#">yes, this is a link</a></p>' +
      '</div>' +
      '</div>';

  // create info window
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  // create a marker
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.6700, -73.9400),
    map: map,
    title: 'Uluru'
  });

  // when marker clicked, show info window
  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map, marker);
  });
}

// load the map
google.maps.event.addDomListener(window, 'load', initialize);

// this will actually be passed in as an object... tbd how yet
var datasetsShow = ["NYC Cool Roofs Buildings", "NYC Greenthumb Community Gardens"]
for (i = 0; i < datasetsShow.length; i++) {
  var fileName = datasetsShow[i].replace(" ", "-");
  // this is the path to the file
  "data/" + fileName + ".json";
  // this should get assed to the getJSON method, one at a time?
};

// load data
// var data;
// $.getJSON("data/NYC-Cool-Roofs-Buildings.json", function(response) {
//   data = response;
//   // for (var i = 0; i < data.data.length; i++) {
//     var newLatLon = new google.maps.LatLng(data.data[0][13][1], data.data[0][13][2])
//     var newMarker = new google.maps.Marker({
//       position: newLatLon,
//       map: map,
//       placeName: 'name',
//       neighborhood: data.data[0][8],
//       placeStreet: data.data[0][10],
//       placeStreet2: data.data[0][11],
//       zip: data.data[0][12]
//     });
//   // };
// });

// load data
var data;
$.getJSON("/data/NYC-Cool-Roofs-Buildings.json", function(response) {
  console.log("test");
  data = response;
  for (var i = 0; i < data.data.length; i++) {
    var newLatLon = new google.maps.LatLng(data.data[i][13][1], data.data[i][13][2])
    var newMarker = new google.maps.Marker({
      position: newLatLon,
      map: map,
      neighborhood: data.data[i][8],
      street: data.data[i][10],
      street2: data.data[i][11],
      zip: data.data[i][12]
    });
  };
});
