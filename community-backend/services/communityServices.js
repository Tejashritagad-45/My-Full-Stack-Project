import mongoose from "mongoose";
import Community from "../models/Community.js";
import User from "../models/User.js";
import Event from "../models/Event.js";




const createCommunity=async({name,description,host,category})=>{
    const inputErrors=[];
    if(!name) inputErrors.push("name cannot be empty");
    if(!description) inputErrors.push("description cannot be empty");
    if(!host) inputErrors.push("host cannot be empty");
    if(!category) inputErrors.push("category cannot be empty");

    if(inputErrors.length) throw new Error(inputErrors.join(","));


    if(!mongoose.Types.ObjectId.isValid(host))
        throw new Error("host id is not valid ObjectId")

 const newCommunity=await new Community({name,description,host,category}).save();
 return newCommunity
 
        
    

};

const getAllCommunities=async()=>{
    const communities=await Community.find().lean()
    return communities
}

const getSpecificCommunity=async(id)=>{
   if(!mongoose.Types.ObjectId.isValid(id))
    throw new Error("community id  is not valid");

   const community= await Community.findById(id).populate({
    path:"host",
    select:"_id name"
   
   })
   .populate({
    path:"members",
    select:"name,email"
   })
   .lean()

  const events= await Event.find({communityId:id}).lean()

   return {community ,events};
    
}

const getSpecificCommunitywithMembers=async(id)=>{
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error("community id is not a valid mongoose ObjectId");
    const community=await Community.findById(id).lean();

    if(!community) throw new Error("no community exists with this id");


    // const members=await User.find({
    //     joinedCommunities:id,
    // }).lean();

    // $in checks if ant element matches
    const members=await User.find({
        joinedCommunities:{
            $in:[id]
        }
    })

    // const members=await User.find({
    //     joinedCommunities:{
    //         $all:[id]
    //     }
    // })




    
    community.members=members;
    return community;    

}


const deleteCommunity=async({id,userId})=>{
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error("given community id is not valid");

    const community= await Community.findById(id).lean()
    if(!community)
        throw new Error("no community exitts this id");
        

    if(community?.host.toString()!=userId.toString())
        throw new Error("current user is not host of this community");

    await Community.findByIdAndDelete(id);
    await Event.deleteMany({communityId:id});

    await User.updateMany(
        {joinedCommunities:id},
        {
            $pull:{joinedCommunities:id},
        },
    );
};

export default {
    createCommunity,
    getAllCommunities,
    getSpecificCommunity,
    getSpecificCommunitywithMembers,
    deleteCommunity,
};

