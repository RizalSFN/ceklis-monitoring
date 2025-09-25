import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createWorkSchedule = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body

        if (!date || !startTime || !endTime) {
            return errorResponse(res, "Semua field wajib diisi", null, 400)
        }

        const newWorkSchedule = await prisma.workSchedule.create({
            data: {
                date: new Date(date),
                startTime: startTime,
                endTime: endTime
            }
        })

        return successResponse(res, "Berhasil membuat data work schedule!", newWorkSchedule, 201)

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

export const updateWorkSchedule = async (req, res) => {
    try {
        const { id } = req.params
        const { startTime, endTime } = req.body

        const data = {}
        if (startTime) data.startTime = startTime
        if (endTime) data.endTime = endTime

        const updatedWorkSchedule = await prisma.workSchedule.update({
            where: {
                id: Number(id)
            },
            data
        })

        return successResponse(res, "Berhasil mengubah data!", updatedWorkSchedule, 200)

    } catch (error) {
        return errorResponse(res, "Gagal mengubah data!", error.message, 500)
    }
}

export const deleteWorkSchedule = async (req, res) => {
    try {
        const { id } = req.params

        await prisma.workSchedule.delete({
            where: {
                id: Number(id)
            }
        })

        return successResponse(res, "Berhasil menghapus data!", null, 200)

    } catch (error) {
        return errorResponse(res, "Gagal menghapus data!", error.message, 500)
    }
}