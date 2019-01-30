module.exports = io => {
  conections=[]


    io.on('connection', socket => {
      
      socket.on('disconnect', () => {
        console.log('Got disconnect!');
        socket.emit('UserDesco')
     });

     socket.on('addMarker', (newMarker) => {
      socket.broadcast.emit('addMarkers',newMarker)
      socket.emit('addMarkers',newMarker)
     })

    
    
     socket.on('init',(name) => {
     
      
      Object.keys(conections).forEach(con => {
        if(con!=name) {
     
          socket.emit('initUsers',conections[con].coords)
        }
      });
     }) 

      console.log('new socket connected');
      socket.on('userCoordinates', (coords,name) => {
        if(name in conections){
        
        } else {
          socket.nickname = name
          socket.coords = coords
          conections[socket.nickname] = socket
          socket.broadcast.emit('newUserCoordinates', socket.coords);
        }
          
       
      });
      
    });
  };