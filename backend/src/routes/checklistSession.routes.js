import express from "express";
import {
    createChecklistSession,
    getChecklistSession,
    getChecklistSessionById,
    getChecklistSessionByWorkScheduleId,
    updateChecklistSession,
    deleteChecklistSession
} from "../controllers/checklistSession.controller";

const checklistSessionRouter = express.Router()

checklistSessionRouter.post("/create", createChecklistSession)
checklistSessionRouter.get("/", getChecklistSession)
checklistSessionRouter.get("/:id", getChecklistSessionById)
checklistSessionRouter.get("/work-schedule/:id", getChecklistSessionByWorkScheduleId)
checklistSessionRouter.put("/:id", updateChecklistSession)
checklistSessionRouter.delete("/:id", deleteChecklistSession)

export default checklistSessionRouter