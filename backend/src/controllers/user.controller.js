import prisma from "../config/db.js"
import { successResponse, errorResponse } from "../utils/response.js"

export const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(successResponse(200, "Berhasil mengambil data user", users))
    } catch (error) {
        return res.status(500).json(errorResponse(500, "Gagal mengambil data user", error.message))
    }
}