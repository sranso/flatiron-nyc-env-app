var map;
function initialize() {
  var thisLatLon = new google.maps.LatLng(40.6700, -73.9400)
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(40.6700, -73.9400)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: thisLatLon,
    map: map,
    title: 'Hello'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

var data;
$.getJSON("data.json", function(response) {
  data = response;
  var newLatLon = new google.maps.LatLng(data.data[5][13][1], data.data[5][13][2])
  var newMarker = new google.maps.Marker({
    position: newLatLon,
    map: map,
    title: 'Jon'
  });
});
