import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createTask = async (req, res) => {
    try {
        const { areaId, name, description } = req.body

        if (!areaId || !name) {
            return errorResponse(res, "Semua field harus diisi!", null, 400)
        }

        const newTask = await prisma.task.create({
            data: {
                areaId,
                name,
                description
            }
        })

        return successResponse(res, "Berhasil membuat task baru!", newTask, 201)
    } catch (error) {
        return errorResponse(res, "Gagal membuat task baru!", error.message, 500)
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await prisma.task.findMany({
            select: {
                id: true,
                Area: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                name: true,
                description: true
            }
        })

        return successResponse(res, "Berhasil memuat data task!", task, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data task!", error.message, 500)
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.body

        const task = await prisma.task.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                area: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                name: true,
                description: true
            }
        })

        return successResponse(res, "Berhasil memuat data task!", task, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data task!", error.message, 500)
    }
}

export const getTaskByAreaId = async (req, res) => {
    try {
        const { areaId } = req.body

        const task = await prisma.task.findUnique({
            where: {
                areaId: areaId
            },
            select: {
                id: true,
                area: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                name: true,
                description: true
            }
        })

        return successResponse(res, "Berhasil memuat data task!", task, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data task!", error.message, 500)
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { areaId, name, description } = req.body

        const data = {}
        if (areaId) data.areaId = areaId
        if (name) data.name = name
        if (description) data.description = description

        const updatedTask = await prisma.task.update({
            where: {
                id: Number(id)
            },
            data
        })

        return successResponse(res, "Berhasil mengubah data task!", updateTask, 200)

    } catch (error) {
        return errorResponse(res, "Gagal mengubah data task!", error.message, 500)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        await prisma.task.delete({
            where: {
                id: Number(id)
            }
        })

        return successResponse(res, "Berhasil menghapus data task", null, 200)

    } catch (error) {
        return errorResponse(res, "Gagal menghapus data task!", error.message, 500)
    }
}