import express from "express";
import {
    createWorkSchedule,
    getWorkSchedule,
    getWorkScheduleByDate,
    updateWorkSchedule,
    deleteWorkSchedule
} from "../controllers/workSchedule.controller.js";

const workScheduleRouter = express.Router()

workScheduleRouter.post("/create", createWorkSchedule)
workScheduleRouter.get("/", getWorkSchedule)
workScheduleRouter.get("/date", getWorkScheduleByDate)
workScheduleRouter.put("/:id", updateWorkSchedule)
workScheduleRouter.delete("/:id", deleteWorkSchedule)

export default workScheduleRouter