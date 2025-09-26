import express from "express";
import {
    createChecklistResult,
    getChecklistResult,
    getChecklistResultById,
    getChecklistResultBySessionId,
    getChecklistResultByTaskId,
    updateChecklistResult,
    deleteChecklistResult
} from "../controllers/checklistResult.controller";

const checklistResultRouter = express.Router()

checklistResultRouter.post("/create", createChecklistResult)
checklistResultRouter.get("/", getChecklistResult)
checklistResultRouter.get("/:id", getChecklistResultById)
checklistResultRouter.get("/session/:id", getChecklistResultBySessionId)
checklistResultRouter.get("/task/:id", getChecklistResultByTaskId)
checklistResultRouter.put("/:id", updateChecklistResult)
checklistResultRouter.delete("/:id", deleteChecklistResult)

export default checklistResultRouter