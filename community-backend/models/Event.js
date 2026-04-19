import mongoose from "mongoose";

const eventSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:1000,


    },
    communityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community",

    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    venue:{
        type:String,
        required:true,
    },
    time:{
        type:Date,
        required:true
    },
    capacity:{
        type:Number,
        
    },
    // mode:{
    //     type:String,
    //     enum:["online,ofline"],
    //     required:true,
    // }
})

const Event=mongoose.model("Event",eventSchema);
export default Event
