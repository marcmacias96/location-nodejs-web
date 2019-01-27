
const express = require("express");
const exphbs = require('express-handlebars');
const morgan = require("morgan");
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser');

//Iniializations
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require('./database');
//Sockets
require('./sockets')(io);

//settings
//Configuramos la base de datos a usar

app.set("port", process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(methodOverride('_method'))
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

//Variables globales
app.use(( req, res, next ) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

//Routes
app.use(require('./routes/index'))
app.use(require('./routes/mapa'))
app.use(require('./routes/users'))

//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server 
server.listen(app.get("port"), () => {
  console.log("NodeJs-Server on Port", app.get("port"));
});
