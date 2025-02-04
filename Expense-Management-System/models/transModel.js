const mongoose=require('mongoose');

const transSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:[true,"id is required"]
    },
    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category:{
        type:String,
        required:[true,'category is required']
    },
    reference:{
        type:String
    },
    description:{
        type:String,
        required:[true,'desc is required']
    },
    date:{
        type:String,
        required:[true,'date is required']
    }

},{timestamps:true});

const transModel=mongoose.model('transactions',transSchema);

module.exports=transModel;