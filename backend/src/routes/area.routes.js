import express from "express";
import {
    createArea,
    deleteArea,
    getArea,
    getAreaById,
    updateArea
} from "../controllers/area.controller";

const AreaRouter = express.Router()

AreaRouter.post("/area/create", createArea)
AreaRouter.get("/area", getArea)
AreaRouter.get("/area/:id", getAreaById)
AreaRouter.put("/area/:id", updateArea)
AreaRouter.delete("/area/:id", deleteArea)

export default AreaRouter