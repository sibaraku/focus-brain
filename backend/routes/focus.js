import express from "express"
import {verifyToken} from "../middleware/authMiddleware.js"
import {startFocus,completeFocus,getStats,getHistory,clearHistory} from "../controllers/focus.js"

const router = express.Router()

router.post("/start",verifyToken,startFocus)
router.post("/:id/complete",verifyToken,completeFocus)
router.get("/stats",verifyToken,getStats)
router.get("/history", verifyToken, getHistory)
router.delete("/history", verifyToken, clearHistory)

export default router