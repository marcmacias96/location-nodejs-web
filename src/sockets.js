module.exports = io => {
  conections=[]


    io.on('connection', socket => {
      
      socket.on('disconnect', () => {
        console.log('Got disconnect!');
        socket.emit('UserDesco')
     });

     socket.on('deleteUser',(corUser) => {
       corUSer.forEach(element => {
          
       });
     })
      socket.on('init',(cords) => {
        socket.emit('InitUnsers',conections)
        conections.push(cords);
      })
      
      console.log('new socket connected');
      socket.on('userCoordinates', (coords) => {
        socket.broadcast.emit('newUserCoordinates', coords);
        
      });
      
    });
  };