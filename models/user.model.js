const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordHash = require("password-hash");
// const jwt = require("jwt-simple");
// const config = require("../config/auth.config");




const UserSchema = new Schema(
    {
        
        name: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String, 
            enum: ['Pending', 'Active'],
            default: 'Pending'
        },
        confirmationCode: { 
            type: String, 
            unique: true 
        },
        createdOn:{type:String}
    }
);

UserSchema.methods = {
    authenticate: function (password) {
         return passwordHash.verify(password, this.password);
    },
    // getToken: function () {
    //      return jwt.encode(this, config.secret);
    // }
};

module.exports = mongoose.model('users', UserSchema)
