import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createWorkSchedule = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body

        const newWorkSchedule = await prisma.workSchedule.create({
            data: {
                date: date,
                startTime: startTime,
                endTime: endTime
            }
        })

        return successResponse(res, "Berhasil membuat data work schedule!", 200)

    } catch (error) {
        return errorResponse(res, "Gagal membuat data work schedule!", error.message, 500)
    }
}