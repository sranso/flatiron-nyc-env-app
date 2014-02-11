var map;
function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(40.6700, -73.9400)
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.6700, -73.9400),
    map: map,
    title: 'Uluru'
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

var data;
$.getJSON("data/map.json", function(response) {
  data = response;
  // for (var i = 0; i < data.data.length; i++) {
    var newLatLon = new google.maps.LatLng(data.data[0][13][1], data.data[0][13][2])
    var newMarker = new google.maps.Marker({
      position: newLatLon,
      map: map,
      placeName: 'name',
      neighborhood: data.data[0][8],
      placeStreet: data.data[0][10],
      placeStreet2: data.data[0][11],
      zip: data.data[0][12]
    });
  // };
});

// var data;
// $.getJSON("data.json", function(response) {
//   data = response;
//   for (var i = 0; i < data.data.length; i++) {
//     var newLatLon = new google.maps.LatLng(data.data[i][13][1], data.data[i][13][2])
//     var newMarker = new google.maps.Marker({
//       position: newLatLon,
//       map: map,
//       neighborhood: data.data[i][8],
//       street: data.data[i][10],
//       street2: data.data[i][11],
//       zip: data.data[i][12]
//     });
//   };
// });
