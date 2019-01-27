const mongo = require('mongoose');
const Schema = mongo.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name : {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true}
});

UserSchema.model.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

UserSchema.Schema.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}

const user = mongo.model('users',UserSchema);
module.exports = user;  