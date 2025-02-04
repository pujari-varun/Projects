const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email si required to be unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']

    }
},{timestamps:true});


const userModel=mongoose.model('users',userSchema);
module.exports=userModel;