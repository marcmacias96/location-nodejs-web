const mongo = require('mongoose');
const Schema = mongo.Schema;

const supervSchemea = new Schema({
    name : String,
    lastName : String,
    age : String,
    email : String,
    de : [{
        type: Schema.Types.ObjectId,
		ref: 'dealer'
    }]
});

const superv  = mongo.model('superv',supervSchemea);
module.exports = superv;