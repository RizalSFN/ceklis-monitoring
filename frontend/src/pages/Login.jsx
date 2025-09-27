import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from 'react-router-dom'

export default function login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")

        try {
            const res = await api.post("/auth/login", { email, password })

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.data))

                navigate("/dashboard")
            } else {
                setErrorMsg(res.data.message || "Login gagal!")
            }

        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Terjadi kesalahan!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}