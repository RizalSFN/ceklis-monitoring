import express from "express";
import {
    createArea,
    deleteArea,
    getArea,
    getAreaById,
    updateArea
} from "../controllers/area.controller";

const areaRouter = express.Router()

areaRouter.post("/create", createArea)
areaRouter.get("/", getArea)
areaRouter.get("/:id", getAreaById)
areaRouter.put("/:id", updateArea)
areaRouter.delete("/:id", deleteArea)

export default areaRouter