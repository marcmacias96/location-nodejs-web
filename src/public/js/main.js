


var map = L.map('map-template');
var cont =0.5;
const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tile = L.tileLayer(tileURL2).addTo(map);
// Socket Io
const socket = io.connect();
name = document.getElementById('nameTitle').textContent
markers= []


map.on('click', addMarker);
function addMarker(e){
  socket.emit('addMarker',e.latlng)
}
// Geolocation
map.locate({enableHighAccuracy: true})

map.on('locationfound', (e) => {
  socket.emit('init',name)
  const coords = [e.latlng.lat, e.latlng.lng];
  map.setView(coords,5);    
  markers[name]= L.marker(coords);
  markers[name].bindPopup(name);
  map.addLayer(markers[name])
  socket.emit('userCoordinates', coords,name);
});



// socket new User connected
socket.on('newUserCoordinates', (coords,name) => {
  const userIcon = L.icon({
    iconUrl: '/img/icon.png',
    iconSize: [38, 42],
  })
   markers[name] = L.marker([coords[0] + cont, coords[1] +cont], {
    icon: userIcon  
  });
  cont +=0.5;
  markers[name].bindPopup(name);
  map.addLayer(markers[name]);
}); 

socket.on('initUsers',(coords,name) => {
  const userIcon = L.icon({
    iconUrl: '/img/icon.png',
    iconSize: [38, 42],
  })
  markers[name] = L.marker([coords[0] + cont, coords[1] +cont], {
    icon: userIcon  
  });
  cont +=0.5;
  markers[name].bindPopup(name);
  console.log('add market:',markers);
  
  map.addLayer(markers[name]);
})


socket.on('UserDesco', (name) => {
  map.removeLayer(markers[name])
  markers[name]=null
});

socket.on('addMarkers',(location) => {
  const userIcon = L.icon({
    iconUrl: '/img/loc.png',
    iconSize: [38, 42],
  })
  const newMarker = L.marker(location,{
    icon: userIcon
  });
  newMarker.bindPopup('New Point!');
  map.addLayer(newMarker  )
  
  
})








