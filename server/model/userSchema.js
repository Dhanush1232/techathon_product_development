const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema
({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken: String, 
    resetPasswordExpires: Date, 
})

userSchema.pre('save', async function(next)
{
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

const User = mongoose.model('TECHATHON', userSchema)

module.exports = User