const mongoose=require("mongoose");

const chatSchema=mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        required:true,
    },
});

const Chat=mongoose.model("Chats",chatSchema);   
module.exports=Chat;
