const mongose = require('mongoose')

mongose.set('useFindAndModify',false);
mongose.connect('mongodb+srv://johanz97:Pa$$w0rd@maps-ccghm.gcp.mongodb.net/test?retryWrites=true',{
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
  .catch(err => console.error(err));