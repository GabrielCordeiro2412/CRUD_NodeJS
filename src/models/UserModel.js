const mongoose = require('../database/index')

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    createAt:{
        type: Date,
        default: Date.now
    }

})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();this;
})

const User = mongoose.model('User', userSchema);

module.exports = User;