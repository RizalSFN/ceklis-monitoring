import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createChecklistResult = async (req, res) => {
    try {
        const { sessionId, taskId, status, remarks } = req.body

        if (!sessionId || !taskId || !status) {
            return errorResponse(res, "Semua field harus diisi", null, 400)
        }

        const newChecklistResult = await prisma.checklistResult.create({
            data: {
                sessionId: sessionId,
                taskId: taskId,
                status: status,
                remarks: remarks
            }
        })

        return successResponse(res, "Berhasil membuat data checklist result", newChecklistResult, 201)
    } catch (error) {
        return errorResponse(res, "Gagal membuat data checkliat result", error.message, 500)
    }
}

export const getChecklistResult = async (req, res) => {
    try {
        const checklistResult = await prisma.checklistResult.findMany({
            select: {
                id: true,
                ChecklistSession: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true
                    }
                },
                Task: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                status: true,
                remarks: true
            }
        })

        return successResponse(res, "Berhasil memuat data checklist result", checklistResult, 200)
        
    } catch (error) {
        return errorResponse(res, "Gagal memuat data checklist result", error.message, 500)
    }
}