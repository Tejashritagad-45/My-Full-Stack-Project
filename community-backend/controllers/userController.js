
import Community from "../models/Community.js";
import User from "../models/User.js";
import UserServices from "../services/UserServices.js";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const {user,token}= await UserServices.registerUser({ name, email, password });
        const isProduction = process.env.NODE_ENV === "production";
        // we take a token form userServices 

        res.cookie("token", token,{
            // here we store this token  in cookiese and cookies is directly send to the browser and browser  store it 
            httpOnly: true,
            sameSite:isProduction ?"none":"lax",
            secure:isProduction,
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day

        });
        res.json({
            data: {
                message: "user registerd succesfully",
                token:token,
                user:user

            },
            error: null,
        })
    } catch (err) {
        console.log(err.message);

        res.json({
            error: {
                message: "failed to register user",
                info: err.message
            },
            data: null
        })
    }

};


const login = async (req, res) => {
    

    try {
        const { email, password } = req.body;
        const user = await UserServices.loginUser({ email, password })
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("token", {
            httpOnly: true,
            sameSite:isProduction?"none":"lax",
            secure:isProduction
        });


        res.cookie("token", user.token, {
            httpOnly: true,
            sameSite: isProduction ?"none":"lax",
            secure:isProduction,
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
        });
        res.json({
            data: {
                message: "user login succesfully",
                user: user.user

            },
            error: null,
        })
        // console.log("NEW TOKEN:", user.token);

    } catch (err) {
        console.log(err.message);

        res.json({
            error: {
                message: "failed to login user",
                info: err.message
            },
            data: null
        })
    }
};


const joinCommunity = async (req, res) => {
    try {
        const { communityId } = req.query
        console.log("req.query is:", req.query);

        const result = await UserServices.joinCommunity({ userId: req.user._id, communityId });



        res.json({
            data: {
                // message: "user has succesfully joined the community",
                data: result

            },
            error: null
        });
    } catch (err) {
        console.log(err);
        res.json({
            error: {
                message: "failed to add user in community",
                info: err.message
            }
        })


    }
}


const profile = async (req, res) => {
    try {
        // const {email}=req.user;
        if (!req.user) throw new Error("user not found from token ,please login/signup again")
            const userId = req.user._id;
             const user = await User.findById(req.user._id)
            // .populate("hostedCommunities")
            .populate("joinedCommunities")
            .populate("rsvpedEvents");
            const hostedCommunities = await Community.find({ host: userId });

        res.json({
            data: {
                message: " user detaile fetch succesfully ",
                user:user,
                hostedCommunities: hostedCommunities 
            },
            error: null,
        })

    } catch (err) {
        req.user
        console.log(err);

        res.json({
            error: {
                message: "failed to find a user",
                info: err.message,
            },
            data: null
        })
    }
}

const makeHost = async (req, res) => {
    try {
        const userId = req.user._id;
        await UserServices.makeHost(userId);
        res.json({
            data: {
                message: "user role changed to host"
            }
        })

    } catch (err) {
        console.log(err);
        res.json({
            error: {
                message: "failed to upgrade user to host",
                info: err.message
            },
            error: null
        })


    }
};

const leaveCommunity = async (req, res) => {
    try {

        const { id } = req.params;
        const { _id: userId } = req.user;
        console.log("communityId", id);
        console.log("userId", req.user?._id);


        await UserServices.leaveCommunity({ userId, id });

        res.json({
            data: {
                message: "user left the community succesfuly",

            },
            error: null
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: {
                message: "failed to remove user from this community",
                info: err.message
            },
            data: null
        })

    }
}


const dashboard = async (req, res) => {
    try {
        const { _id: id } = req.user;
        const dashboard = await UserServices.dashboard(id)
        res.json({
            data: {
                message: "succesfully fetched the member dashboard",
                dashboard,
            },
            error: null
        })
        console.log("Dashboard controller running");
    } catch (err) {
        console.log(err);
        res.json({
            error: {
                message: "failed to fetched the member dashboard",
                info: err.message,
            },
            data: null
        })

    }
}

const hostDashboard = async (req, res) => {
    try {
        const { _id: id } = req.user;
        const hostDashboard = await UserServices.hostDashboard(id)
        res.json({
            data: {
                message: "successfully fetched the host dashboard",
                hostDashboard,
            },
            error: null
        })
    } catch (err) {
        console.log(err);
        res.json({

            error: {
                message: "failed to fetched the host dashboard",
                info: err.message
            },
            data: null

        })


    }
}

const toggleRSVP = async (req, res) => {
    try {
        const user = req.user;
        const { eventId } = req.query;
        await UserServices.toggleRSVP({ user, eventId })

        res.json({
            data: {
                message: "succesfully toggle the events"
            },
            error: null
        })
    } catch (err) {
        console.log(err);

        res.json({
            error: {
                message: "failed to toggle rsvp",
                info: err.message
            },
            data: null
        })

    }
};


const logout = (req, res) => {
    try {
    const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: isProduction?"none":"lax",
            secure:isProduction
        });

        res.json({
            data: {
                message: "logout succesfully"
            },
            error: null
        })
    } catch (err) {
        res.json({
            error: {
                message: "failed to logout"
            },
            data: null
        })
    }
}




const userProfilePic = async (req, res) => {
    try {
        if (!req.file?.mimetype?.startsWith("image/"))
            throw new Error("only images are allowed as profile picture");

        const userProfilePath = req.file;
        const userId = req.user._id;
        await UserServices.uploadProfilePic({ userProfilePath, userId })

        res.json({
            data: {
                message: "profile picture update succfully",
                file: req.file
            },
            error: null
        })
    } catch (error) {
        res.json({
            error: {
                message: "failed to update profile picture",
                info: error.message
            },
            data: null
        })
    }
}



export default {
    register,
    login,
    profile,
    joinCommunity,
    makeHost,
    leaveCommunity,
    dashboard,
    hostDashboard,
    toggleRSVP,
    logout,
    userProfilePic
}