const mongose = require('mongoose')

mongose.set('useFindAndModify',false);
mongose.connect('mongodb://localhost/maps',{
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
  .catch(err => console.error('Base de datos no conectada',err));