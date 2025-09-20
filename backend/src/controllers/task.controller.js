import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createTask = async (req, res) => {
    try {
        const { areaId, name, description } = req.body

        const newTask = await prisma.task.create({
            data: {
                areaId,
                name,
                description
            }
        })

        return successResponse(res, "Berhasil membuat task baru!", newTask, 200)
    } catch (error) {
        return errorResponse(res, "Gagal membuat task baru!", error.message, 500)
    }
}