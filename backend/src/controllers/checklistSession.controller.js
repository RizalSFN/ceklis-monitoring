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

export const getChecklistSession = async (req, res) => {
    try {
        const checklistSession = await prisma.checklistSession.findMany({
            select: {
                id: true,
                User: {
                    select: {
                        id: true
                    }
                },
                WorkSchedule: {
                    select: {
                        id: true,
                        date: true,
                        startTime: true,
                        endTime: true
                    }
                }
            }
        })

        return successResponse(res, "Berhasil memuat data checklist session!", checklistSession, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data checklist session!", error.message, 500)
    }
}

export const getChecklistSessionById = async (req, res) => {
    try {
        const { id } = req.params

        const checklistSession = await prisma.checklistSession.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                User: {
                    select: {
                        name: true
                    }
                },
                WorkSchedule: {
                    select: {
                        id: true,
                        date: true,
                        startTime: true,
                        endTime: true
                    }
                },
                startTime: true,
                endTime: true,
                notes: true
            }
        })

        return successResponse(res, "Berhasil memuat data checklist session!", checklistSession, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data checklist session!", error.message, 500)
    }
}