import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/bagikopi.png"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")

        try {
            const res = await api.post("/api/auth/login", { email, password })

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.data))

                navigate("/dashboard")
            } else {
                console.log(res.message);

                setErrorMsg(res.message || "Login gagal!")
            }

        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Terjadi kesalahan!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <img
                    alt="Your Company"
                    src={logo}
                    className="mx-auto h-20 w-auto"
                />
                <h1 className="font-bold text-3xl text-center my-5 tracking-wider">Bagi Kopi</h1>


                {errorMsg && (
                    <div className="mb-4 p-3 font-semibold tracking-wide bg-red-200 text-red-600 rounded">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="mt-10 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Copyright@
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        2025
                    </a>
                </p>
            </div>
        </div>
    )
}