

var map = L.map('map-template');
var cont =0.5;
const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tile = L.tileLayer(tileURL2).addTo(map);
// Socket Io
const socket = io.connect();

map.on('click', addMarker);
function addMarker(e){
  socket.emit('addMarker',e.latlng)
}
// Geolocation
map.locate({enableHighAccuracy: true})

map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  map.setView(coords,8);
  socket.emit('init',coords)
    
  const newMarker = L.marker(coords);
  newMarker.bindPopup('You are Here!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});


// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  
  const userIcon = L.icon({
    iconUrl: '/img/icon.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat + cont, coords.lng +cont], {
    icon: userIcon  
  });
  cont +=0.5;
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

socket.on('InitUnsers',(conections) => {
  console.log(conections);
  
  conections.forEach(coords => {
    const userIcon = L.icon({
      iconUrl: '/img/icon.png',
      iconSize: [38, 42],
    })
    const newUserMarker = L.marker([coords[0] + cont, coords[1] +cont], {
      icon: userIcon  
    });
    cont ++
    newUserMarker.bindPopup('New User!');
    map.addLayer(newUserMarker);
  });
  
})

socket.on('UserDesco', () => {
  console.log('Got disconnect!');
  var confirmacion = confirm("Pulsa el botón que quieras");
if(confirmacion){
	alert("Has pulsado aceptar");
} else {
	alert("Has pulsado cancelar");
}
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








