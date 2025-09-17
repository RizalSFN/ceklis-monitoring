import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createArea = async (req, res) => {
    try {
        const { name, description } = req.body

        const newArea = await prisma.area.create({
            data: {
                name,
                description
            }
        })

        return successResponse(res, "Berhasil menambah area!", newArea, 200)

    } catch (error) {
        return errorResponse(res, "Gagal membuat data area!", error.message, 500)
    }
}

export const getArea = async (req, res) => {
    try {
        const areas = await prisma.area.findMany({
            select: {
                id: true,
                name: true,
                description: true
            }
        })

        return successResponse(res, "Berhasil memuat data area!", areas, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data area!", error.message, 500)
    }
}

export const getAreaById = async (req, res) => {
    try {
        const { id } = req.params

        const area = await prisma.area.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                description: true
            }
        })

        return successResponse(res, "Berhasil memuat data area!", area, 200)

    } catch (error) {
        return errorResponse(res, "Gagal memuat data area!", error.message, 500)
    }
}

export const updateArea = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const data = {}
        if (name) data.name = name
        if (description) data.description = description

        const area = await prisma.area.update({
            where: {
                id: Number(id)
            },
            data
        })

        return successResponse(res, "Berhasil mengupdate data area!", 200)

    } catch (error) {
        return errorResponse(res, "Gagal mengupdate data area!", error.message, 500)
    }
}

export const deleteArea = async (req, res) => {
    try {
        const { id } = req.params

        await prisma.area.delete({
            where: {
                id: Number(id)
            }
        })

        return successResponse(res, "Berhasil menghapus data area!", null, 200)

    } catch (error) {
        return errorResponse(res, "Gagal menghapus data area!", error.message, 500)
    }
}