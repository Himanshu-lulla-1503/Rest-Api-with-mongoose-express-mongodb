const mongoose = require('mongoose');
const leaderschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
    
});
const leaders=mongoose.model('leader',leaderschema);
module.exports=leaders;


