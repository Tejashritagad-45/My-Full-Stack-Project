import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Community from "../models/Community.js";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import uploadProfilePic from "../config/multer.js";
import crypto from "crypto";


const registerUser = async ({ name, email, password }) => {
    const inputErrors = [];
    if (!name) inputErrors.push("Name.is required");
    if (!email) inputErrors.push("Email is required");
    if (!password) inputErrors.push("Password is required");

    if (password?.length < 6) inputErrors.push("password length must be atleast 6 characters");

    if (name.length < 10) inputErrors.push("Name length must be in a range [10,100]");
    const existingUser = await User.findOne({ email: email });

    if (existingUser) inputErrors.push(`Email:${email} already exists`);

    if (inputErrors.length) throw new Error(inputErrors.join(", "));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        hashedPassword: hashedPassword,
    });

    const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }

    )
    console.log("register token", token);



    // if(!name) throw new Error("name is a empty");

    await user.save();
    return ({ user,token })
}

const loginUser = async ({ email, password }) => {
    const inputErrors = [];
    if (!email) inputErrors.push("Email is required");

    if (!password) {
        inputErrors.push("Password is required")
    } else if (password?.length < 6) {
        inputErrors.push("password length must be atleast 6 characters")
    }
    if (inputErrors.length) {
        throw new Error(inputErrors.join(", "));
    }

    const existingUser = await User.findOne({ email }).select("+hashedPassword")
        .populate({
            path: "joinedCommunities",
            select: "name category "
        }) 
        .populate({
            path: "rsvpedEvents",
            select: "name city time",

            populate: {
                path: "communityId",
                select: "name"

            }
        })
        .lean();

    if (!existingUser) {
        throw new Error(`user with this ${email} dose'n exit`);

    }

    const validPassword = await bcrypt.compare(
        password,
        existingUser.hashedPassword,
    )

    if (!validPassword) throw new Error("Invalid password");

    const hostedCommunities = await Community.find({ host: existingUser._id })

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    console.log("Generated token:", token);



    //    console.log({user});
    delete existingUser.hashedPassword;
    existingUser.hostedCommunities = hostedCommunities;
    const user = existingUser
    return { token, user }


}


// const profile=async({email})=>{
//     const user=await User.findOne({email}).select("-password");
//     if(!user) 
//         throw new Error("failed to find a user");

//     return user ; 

// }

const joinCommunity = async ({ userId, communityId }) => {
    console.log("communityId", communityId);

    if (!communityId) {
        throw new Error("community is not  a valid");

    }
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
        throw new Error("community is not valid objectId");

    }

    const existingCommunity = await Community.findById(communityId);
    if (!existingCommunity) {
        throw new Error("community is not valid");

    }

   const updateUser= await User.findByIdAndUpdate(userId, 
        {
        $addToSet: {joinedCommunities: communityId},
        },
        {new:true}

    );

    await Community.findByIdAndUpdate(communityId,
        {
            $addToSet:{members:userId}
        }
    );
    return{
        message:"joined succefully",
        user:updateUser,
        joinedCommunities:updateUser.joinedCommunities,
    }


}

const makeHost = async (userId) => {
    await User.findByIdAndUpdate(userId, {
        $set: { role: "host" },
    });
};


const leaveCommunity = async ({ userId, id }) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new Error("given id is not valid mongoose id");
    const community = await Community.findById(id);
    console.log("this is a id", community)

    if (!community)
        throw new Error("no community exists with this id");

    await User.findByIdAndUpdate(userId, {
        $pull: {
            joinedCommunities: id,

        }
    });


}

const dashboard = async (id) => {
    const dashboard = await User.findById(id)
        .select("name role joinedCommunities rsvpedEvents")
        .populate({
            path: "joinedCommunities",
            select: "name category "
        })
        .populate({
            path: "rsvpedEvents",
            select: "name city time ",
            populate: {
                path: "communityId",
                select: "name",
            },
        })

    return dashboard;

}

const hostDashboard = async (id) => {
    const hostDashboard = await User.findById(id)
   
    


        .select("name role joinedCommunities rsvpedEvents")
        .populate({
            path: "joinedCommunities",
            select: "name category"
        })
        .populate({
            path: "rsvpedEvents",
            select: "name city time",

            populate: {
                path: "communityId",
                select: "name"

            }
        })
        .lean();
    console.log(hostDashboard);


    const hostedCommunities = await Community.find({ host: id })
    hostDashboard.hostedCommunities = hostedCommunities

    const communityIds=hostedCommunities.map(c=>c._id)

    const createdEvents=await Event.find({communityId:
        {$in:communityIds }
    })
    .populate("communityId","name")
    .lean()

    if(!hostDashboard)  throw new Error("user is not found")
        
     hostDashboard.createdEvents=createdEvents



    return hostDashboard;

}

const toggleRSVP = async ({ user, eventId }) => {
    const isEventAlreadyRSVPed = user.rsvpedEvents.includes(eventId)
    if (isEventAlreadyRSVPed) {
        user.rsvpedEvents.pull(eventId)
    } else {
        user.rsvpedEvents.push(eventId)
    }
    console.log({ isEventAlreadyRSVPed, user });
    await user.save();

}

const forgetPassword=async({email})=>{
    const user= await User.findOne({email})
    console.log(user);
    
    if(!user)
        throw new Error("user is not found");
    const resetToken=crypto.randomBytes(32).toString("hex")

    const hashedToken=crypto
     .createHash("sha256")
     .update(resetToken)
     .digest("hex")
 
     user.resetPasswordToken=hashedToken;
     user.resetPasswordExpire=Date.now()+10*60*1000

     await user.save();

     const resetURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`
     console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

     return {resetURL}
        
}

const resetPassword=async({token,password})=>{
    const hashedToken=crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")


    const user=await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpire:{$gt: Date.now()},
    }).select("+hashedPassword");

    if(!user){
        throw new Error("Invalid Expired token");
        
    }

    const newhashedPassword=await bcrypt.hash(password,10)
    user.hashedPassword=newhashedPassword;

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    return {succes:true};
};

const uploadProfilePics = async ({ userProfilePath, userId }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { profilePicUrl: userProfilePath }
    )
}

export default {
    registerUser,
    loginUser,
    joinCommunity,
    makeHost,
    leaveCommunity,
    dashboard,
    hostDashboard,
    toggleRSVP,
    uploadProfilePics,
    forgetPassword,
    resetPassword,
};