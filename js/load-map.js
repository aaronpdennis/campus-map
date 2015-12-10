// This access token allows us to use Mapbox's API
mapboxgl.accessToken = 'pk.eyJ1IjoibWRlZnJhdHRpIiwiYSI6IndDOVJ2NmMifQ.H8GBc8poxw4tU9GkfvAlWQ';

// Set the maximum bounds so the map user doesn't pan too far from campus
var southWest = [40.7643, -77.9043], // south-west corner of maximum view
    northEast = [40.8844, -77.8064]; // north-east corner of maximum view

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mdefratti/cihnp3l7o007h91kn5ulf6f22',
  hash: false,
  center: [-77.86, 40.8],
  bearing: -45,
  zoom: 14.5
});
