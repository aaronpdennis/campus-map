// This access token allows us to use Mapbox's API
mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25kZW5uaXMiLCJhIjoiem5LLURoYyJ9.T3tswGTI5ve8_wE-a02cMw';

// Set the maximum bounds so the map user doesn't pan too far from campus
var southWest = [40.7643, -77.9043], // south-west corner of maximum view
    northEast = [40.8844, -77.8064]; // north-east corner of maximum view

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/aarondennis/cij4mel36000690m3lqaixibk',
  hash: false,
  center: [-77.86, 40.8],
  bearing: -45,
  zoom: 14.5
});
