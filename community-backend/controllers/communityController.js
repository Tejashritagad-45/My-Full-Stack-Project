// import mongoose from "mongoose";
import communityServices from "../services/communityServices.js";

const createCommunity=async(req,res)=>{
    try{
        const {name,description,category}=req.body;
        const host=req.user._id;
        console.log(req.body);
        
     const newCommunity =await  communityServices.createCommunity({name,description,host,category});
        res.json({
            data:{
                message:"community created successfully",
                data:newCommunity,
            },
            error:null,
        });

    }catch(err){
        console.log(err);
        res.json({
            error:{
                message:"failed to create community",
                info:err.message,
            },
            data:null,
        });
        
    }

}




const getAllCommunities=async(req,res)=>{
    try{
     
        const communities=await communityServices.getAllCommunities()

        res.json({
            data:{
                message:"successfulyy fetched all communities",
                communities,
            },
            error:null,
        })

    }catch(err){
        console.log(err);
        res.json({
            error:{
                message:"failed to get all communities",
                Info:err.message
            },
            data:null
        })
        
    }
}




const getSpecificCommunity=async(req,res)=>{
    try{

           const {id}=req.query;
        const specificCommunity = await communityServices.getSpecificCommunity(id);
       
        res.json({
            data:{
                message:"succesfully fetched community details",
                 specificCommunity,
            },
            error:null
        });
    }catch(err){
        console.log(err);
        
        res.json({
            error:{
                message:"community not found",
                info:err.message
            },
            data:null
        })
    }

}


const getSpecificCommunitywithMembers=async(req,res)=>{
    try{
        const{id}=req.query;
        console.log("community",req.query.id);
        
        const community=await communityServices.getSpecificCommunitywithMembers(id);
        res.json({
            data:{
                message:"community with all members fetched succesfully",
                community

            },
            error:null
        })
    }catch(err){
        console.log(err);
        
       res.json({
        error:{
            message:"not found a member"
        },
        data:null
       })
    }
};

const deleteCommunity=async(req,res)=>{
    try{
        const {id}=req.params;
        const {_id:userId}=req.user;
        console.log("communityId:", id);
        console.log("length:",id.length);
        
        await communityServices.deleteCommunity({id,userId});
        
        res.json({
            data:{
                message:"community deleted succesfully"

            },
            error:null
        })
    }catch(err){
        console.log(err);
        
        res.json({
            error:{
                message:"unable to delete this community",
                info:err.message,
            },
            data:null
        })
    }

}

export default {
    createCommunity,
    getAllCommunities,
    getSpecificCommunity,
    getSpecificCommunitywithMembers,
    deleteCommunity,

};
