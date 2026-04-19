import express from "express"

// import {register} from "../controllers/userController.js"
import userController from "../controllers/userController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isMemberMiddleware } from "../Middleware/isMemberMiddleware.js";
import { isHostMiddleware } from "../Middleware/isHostMiddleware.js";
import uploadProfilePic from "../config/multer.js";
const router=express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/me", verifyToken,userController.profile);
router.patch("/join-community", verifyToken,userController.joinCommunity);
router.patch("/make-host",verifyToken,userController.makeHost);
router.patch("/leave-community/:id",verifyToken,userController.leaveCommunity);
router.get("/dashboard",verifyToken,isMemberMiddleware ,userController.dashboard)
router.get("/host-dashboard",verifyToken,isHostMiddleware ,userController.hostDashboard);
router.patch("/toggleRSVP",verifyToken,userController.toggleRSVP);
router.get("/logout",verifyToken,userController.logout)
router.patch("/userProfilePic",uploadProfilePic.single("profilePic"),userController.userProfilePic)
// here if we want  use a multiple then we use a array and pass one arg limit kitane dene hai like a 10
// router.patch("/userProfilePic", userProfilePic.single("profilePic",10),userController.userProfilePic)


export default router;