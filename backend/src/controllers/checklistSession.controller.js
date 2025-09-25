import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createChecklistSession = async (req, res) => {
    try {
        const { userId, workScheduleId, startTime, endTime, notes } = req.body

        if (!userId || !workScheduleId || !startTime || !endTime || !notes) {
            return errorResponse(res, "Semua field harus diisi!", null, 400)
        }

        const newChecklistSession = await prisma.checklistSession.create({
            data: {
                userId: userId,
                workScheduleId: workScheduleId,
                startTime: startTime,
                endTime: endTime,
                notes: notes
            }
        })

        return successResponse(res, "Berhasil membuat data checklist session!", newChecklistSession, 201)

    } catch (error) {
        return errorResponse(res, "Gagal membuat data checklist session!", error.message, 500)
    }
}