import User from "../models/User.js";
import eventServices from "../services/eventServices.js";
import eventSevices from "../services/eventServices.js"



const createEvent=async(req,res)=>{
     try{
        const{name,description,communityId,city,venue,time,capacity}=req.body;
        console.log("this is a body",req.body);
        
        const hostId=req.user._id
      const event=  await eventSevices.createEvent({name,description,communityId,city,venue,time,capacity,hostId})

        res.json({
            data:{
                message:"event is created",
                event
            },
            error:null
        })

     }catch(err){
        console.log(err);
        res.json({
            data:null,
            error:{
                message:" failed to event is cretae",
                info:err.message
            }
        })
        
     }
 
}


const getAllEvents=async (req,res)=>{
   try{
    const {city,keyword}=req.query;
    const events=await eventServices.getAllEvents({city,keyword});
     res.json({
        data:{
            message:"succesfully fetched the list of searched events",
            events

        },
        error:null
    })
   }catch(err){
    console.log(err);
    res.json({
        error:{
            message:"failed to the fetched data"
        },
        data:null
    })
    
   }
}

const getSpecificEvent=async(req,res)=>{
       try{
        const{id}=req.query;
        console.log("this is a id",id);
        
        const event=await eventServices.getSpecificEvent(id)
        res.json({
            data:{
                message:"succesFully fetched the  specific event",
                event,
                

            },
            error:null
        })
       }catch(err){
        console.log(err);
        res.json({
            error:{
                message:"failed to get a specific event",
                info:err.message
            },
            data:null
        })
        
       }

}

 const getSpecificEventWithMember=async(req,res)=>{
    try{
        const{id}=req.query
        // const userId=req.user._id
        // console.log("rejfb",req.query);
        
           console.log("event",req.query.id);
        const event=await eventServices.getSpecificEventWithMember(id)
        res.json({
            data:{
                message:"event with members fetched succesfully",
                event
            },
            error:null
        })

    }catch(error){
        console.log(error);
        
        res.json({
            error:{
                message:"member not found"
            },
            data:null
        })
    }
 }

const deleteEvent=async(req,res)=>{
    try{
        const {id}=req.params;
        const {_id:userId}=req.user;
        console.log("event",id);
        console.log("user",userId);
        
        
        
        await eventServices.deleteEvent({id,userId})
        
      res.json({
        data:{
            message:"successfully delete the event"
        },
        error:null
      })
         

    }catch(err){
        console.log(err);
        res.json({
            error:{
                message:"failed to delete event"
            }
        })
        

    }
}



export default{
     createEvent,
     getAllEvents,
     getSpecificEvent,
     getSpecificEventWithMember,
     deleteEvent,
    }