 const mongoose = require ('mongoose')

 const AuthSchema = new mongoose.Schema({
    email: { type: String, require: true},
    userName: {type: String, require: true},
    password: {type: String, require: true}
 }, {timestamps: true})

module.exports = mongoose.model('AuthModel',AuthSchema)