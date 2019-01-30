const mongose = require('mongoose')
//cluster
//mongodb+srv://johanz97:Pa$$w0rd@maps-ccghm.gcp.mongodb.net/test?retryWrites=true
//local
//mongodb://localhost/maps
mongose.set('useFindAndModify',false);
mongose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@maps-ccghm.gcp.mongodb.net/test?retryWrites=true`,{
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
  .catch(err => console.error('Base de datos no conectada',err));