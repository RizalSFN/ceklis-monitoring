import express from "express";
import {
    createArea,
    deleteArea,
    getArea,
    getAreaById,
    updateArea
} from "../controllers/area.controller";

const AreaRouter = express.Router()

AreaRouter.post("/create", createArea)
AreaRouter.get("/", getArea)
AreaRouter.get("/:id", getAreaById)
AreaRouter.put("/:id", updateArea)
AreaRouter.delete("/:id", deleteArea)

export default AreaRouter