const body_parser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongo = require("mongoose");
const userRoutes = require('./routes/users');
const socketIO = require('socket.io');
const http = require('http');
const engine = require('ejs-mate');
const path = require('path');
//Iniializations
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//settings
//Configuramos la base de datos a usar
mongo.Promise=global.Promise;
/*mongo.connect(
    "mongodb://localhost/rest-api",
    {
      useNewUrlParser: true
    }
  )
  .then(db => console.log("db is conected"))
  .catch(err => console.log(err));*/
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//establecemos el puerto a usar
app.set("port", process.env.PORT || 3000);

//middlware
app.use(morgan("dev"));
app.use(body_parser.json());
//Sockets
require('./sockets')(io);
//Routes
app.use('/superv',userRoutes);
app.get('/mapa',(req,res)=>{
  res.render('index');
})
//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server 
server.listen(app.get("port"), () => {
  console.log("NodeJs-Server on Port", app.get("port"));
});
