const mongo = require('mongoose');
const Schema = mongo.Schema;

const dealerSchema = new Schema({
    name : String,
    lastName : String,
    email : String,
    seller : {
        type : Schema.Types.ObjectId,
        ref : 'superv'
    }
});
const dealer = mongo.model('dealer',dealerSchema);
module.exports = dealer;  