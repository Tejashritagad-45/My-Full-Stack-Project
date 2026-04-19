import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        // console.log("headers.cookie:", req.headers.cookie);
        // console.log("req.cookies:", req.cookies);
        // console.log({token});
        if (!token) throw new Error("token is not found in cookies");
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("this is a email",{email});
        
        const user = await User.findOne({ email });
        req.user=user
        console.log("Decoded User:", req.user);

        if (!user) throw new Error("Invalid payload")
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.json({
            error: {
                message: "failed to verify token",
                info: err.message
            },
            data: null
        });


    }
}