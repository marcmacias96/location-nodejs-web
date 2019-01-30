const mongose = require('mongoose')

mongose.set('useFindAndModify',false);
mongose.connect('mongodb+srv://mmacias96:Guitarra2896@maps-a9jhm.azure.mongodb.net/test?retryWrites=true',{
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
  .catch(err => console.error('Base de datos no conectada',err));