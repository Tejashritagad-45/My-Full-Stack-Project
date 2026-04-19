import mongoose from "mongoose";
import Event from "../models/Event.js";
import Community from "../models/Community.js";
import User from "../models/User.js";

const checkInputErrors = ({
    name,
    description,
    communityId,
    city,
    venue,
    time
}) => {
    const inputErrors = [];
    if (!name) inputErrors.push("name cannot be empty");
    if (!description) inputErrors.push("description cannot be empty");
    if (description?.length > 1000)
        inputErrors.push("descriptoon length cannot be more than 1000")
    if (!communityId) inputErrors.push("communityId cannot be empty");

    if (!city) inputErrors.push("city cannot be empty");
    if (!venue) inputErrors.push("venue cannot be empty");
    if (!time) inputErrors.push("time cannot be empty");

    return inputErrors;


}

const createEvent = async ({ name, description, communityId, city, venue, time, capacity, hostId }) => {
    const inputErrors = checkInputErrors({
        name,
        description,
        communityId,
        city,
        venue,
        time,

    })

    if (inputErrors.length) throw new Error(inputErrors.join(","));
    console.log("Incoming communityId:", communityId);


    const community = await Community.findById(communityId);
    console.log("Found community:", community);

    if (!community) throw new Error("community id is invalid");

    if (community.host.toString() != hostId.toString()) {
        //    console.log("community.host:", community.host.toString());
        //     console.log("loggedIn user:", hostId.toString());

        throw new Error(`current user is not valid of ${community.name} community`);
    }

    const event = new Event({ name, description, communityId, city, venue, hostId });

    if (capacity) event.capacity = capacity;
    event.time = new Date(time);

    await event.save();
    return event;
};


const getAllEvents = async ({ city, keyword }) => {
    const filter = {
        time: { $gte: new Date() },
    };
    const conditions=[]

    if (city) {
        conditions.push({
            city:{ $regex: city, $options: "i" }
        }) 

    }

    if (keyword)
        conditions.push({
       $or :[
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { city: { $regex: keyword, $options: "i" } },
        ]
    })

    if (conditions.length > 0) {
        filter.$and = conditions;
    }


    const events = await Event.find(filter).populate({
        path: "communityId",
        select: "name host",
        populate: { path: "host", select: "name" }
    })
    return events;

}


const getSpecificEvent = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error("given object is is not a valid mogoose object id");

    const event = await Event.findById(id)
        .populate({
            path: "communityId",
            select: "_id name host",
            populate: {
                path: "host",
                select: "name _id"
            }
        }).lean();

    if (!event) throw new Error("event is not found");

    return event
}

const getSpecificEventWithMember=async(id)=>{
    console.log("eventId:", id);
 if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error("event Id is not valid moongoose object");
   
    const event=await Event.findById(id).lean()

    if(!event)
        throw new Error("event is not found")
    const members=await User.find({
        rsvpedEvents:{
            $in:[id]
        }
    })
    event.members=members;
    
    return event

}

const deleteEvent = async ({ id, userId }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("id is not valid ");

    }

    const event = await Event.findById(id).lean();
    if (!event)
        throw new Error("no event exit with this id");


    const community = await Community.findById(event.communityId)
    if (!community)
        throw new Error("community is not found");

    if (community?.host.toString() != userId.toString())
        throw new Error("current user is not a host ");


    await Event.findByIdAndDelete(id)



}

export default {
    createEvent,
    getAllEvents,
    getSpecificEvent,
    getSpecificEventWithMember,
    deleteEvent
}

