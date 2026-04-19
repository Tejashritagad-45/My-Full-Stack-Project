import express from "express";
import communityController from "../controllers/communityController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isHostMiddleware } from "../Middleware/isHostMiddleware.js";

  const router=express.Router();



router.post("/create",verifyToken,isHostMiddleware, communityController.createCommunity);
router.get("/all",communityController.getAllCommunities);
router.get("/specific",communityController.getSpecificCommunity);
router.get("/with-members",communityController.getSpecificCommunitywithMembers);
router.delete("/:id",verifyToken,isHostMiddleware,communityController.deleteCommunity)//this is for a delete community

export default router