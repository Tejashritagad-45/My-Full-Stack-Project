import mongoose from "mongoose";

const communitySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    members: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],

    category:{
        type:String,
        enum:["Chess","Mern","Cooking","Tech","Jobs","Sports","Politics"],
        required:true

    },

    events:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ]


});
const Community=mongoose.model("Community",communitySchema);
export default Community;
