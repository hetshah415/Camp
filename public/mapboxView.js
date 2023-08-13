mapboxgl.accessToken =
  "pk.eyJ1IjoiaGV0c2hhaDQxNSIsImEiOiJjbGs3aWZ0OTUwOHV6M2tvODM0YTJidG04In0.Hw18d6g7WYqYsvExNJbn9Q";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: geoLocation, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker().setLngLat(geoLocation).addTo(map);
