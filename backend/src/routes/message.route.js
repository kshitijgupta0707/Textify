import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages , getUsersForSidebar , sendMessage } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

//you will getch the id in the function getmessages using req.params
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;