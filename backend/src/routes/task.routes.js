import express from "express";
import {
    createTask,
    getTask,
    getTaskById,
    getTaskByAreaId,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const taskRouter = express.Router()

taskRouter.post("/create", createTask)
taskRouter.get("/", getTask)
taskRouter.get("/:id", getTaskById)
taskRouter.get("/area/:id", getTaskByAreaId)
taskRouter.put("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)

export default taskRouter
