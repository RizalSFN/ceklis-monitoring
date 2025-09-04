import prisma from "../config/db.js"
import { successResponse, errorResponse } from "../utils/response.js"

export const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(successResponse(res, 200, "Berhasil mengambil data user", users))
    } catch (error) {
        return res.status(500).json(errorResponse(res, 500, "Gagal mengambil data user", error.message))
    }
}