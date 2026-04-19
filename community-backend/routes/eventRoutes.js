import express from "express";
const router=express.Router();
import eventController from "../controllers/eventController.js"
import { verifyToken } from "../Middleware/verifyToken.js";
import { isHostMiddleware } from "../Middleware/isHostMiddleware.js";

router.post("/createEvents",verifyToken,isHostMiddleware,eventController.createEvent)
router.get("/all",eventController.getAllEvents);
router.get("/getSpecific",eventController.getSpecificEvent);
router.get("/withEventMember",eventController.getSpecificEventWithMember)
router.delete("/:id",verifyToken,isHostMiddleware,eventController.deleteEvent)
// router.get("/:id",(req,res)=>{});
// router.post("/:rsvp",(req,res)=>{});
// router.post("/:cancel-rsvp",(req,res)=>{});

export default router; 