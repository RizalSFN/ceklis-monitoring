import prisma from "../config/db"
import bcrypt from "bcrypt"
import { errorResponse, successResponse } from "../utils/response"

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await prisma.user.findUnique({ where: email })
        if (existingUser) {
            return res.status(400).json(errorResponse(400, "Email sudah dipakai"))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return res.status(200).json(successResponse(200, "Registrasi berhasil"))

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Registrasi user gagal", error.message))
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: email })
        if (!user) {
            return res.status(404).json(errorResponse(404, "User tidak ditemukan"))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json(errorResponse(401, "Password salah"))
        }

        return res.status(200).json(successResponse(200, "Login berhasil"))
    } catch (error) {
        return res.status(500).json(errorResponse(500, "Login gagal"))
    }
}