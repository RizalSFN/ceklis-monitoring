import prisma from "../config/db.js"
import bcrypt from "bcrypt"
import { errorResponse, successResponse } from "../utils/response.js"

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await prisma.user.findUnique({ where: { email: email } })
        if (existingUser) {
            return errorResponse(res, "Email sudah dipakai", "", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return successResponse(res, "Registrasi berhasil", "", 200)

    } catch (error) {
        return errorResponse(res, "Registrasi user gagal", error.message, 500)
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            return errorResponse(res, "User tidak ditemukan", "", 404)
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return errorResponse(res, "Username atau Password salah", "", 401)
        }

        return successResponse(res, "Login berhasil", "", 200)
    } catch (error) {
        return errorResponse(res, "Login gagal", "", 500)
    }
}