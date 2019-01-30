const mongo = require('mongoose');
const Schema = mongo.Schema;

const UbicationSchemea = new Schema({
    name : { type: String, required: true},
    description : {type: String, required:  true},
    location : { type: String ,required: true},
    user : { type: String, required: true},
    date : { type: Date, default: Date.now },
    
});

const ubication  = mongo.model('ubications',UbicationSchemea);
module.exports = ubication;

