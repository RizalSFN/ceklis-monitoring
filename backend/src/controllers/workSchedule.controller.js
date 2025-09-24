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

        return successResponse(res, "Berhasil membuat data work schedule!", newWorkSchedule, 200)

    } catch (error) {
        return errorResponse(res, "Gagal membuat data work schedule!", error.message, 500)
    }
}

export const getWorkSchedule = async (req, res) => {
    try {
        const workSchedule = await prisma.workSchedule.findMany({
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true
            }
        })

        return successResponse(res, "Berhasil memuat data!", workSchedule, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data!", error.message, 500)
    }
}

export const getWorkScheduleByDate = async (req, res) => {
    try {
        const { date } = req.body

        const workSchedule = await prisma.workSchedule.findUnique({
            where: {
                date: date
            },
            select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true
            }
        })

        return successResponse(res, "Berhasil memuat data!", workSchedule, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data!", error.message, 500)
    }
}