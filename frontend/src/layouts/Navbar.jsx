import React from "react";
import {
    Menu,
    X,
    CircleUser,
} from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className="flex items-center justify-between bg-white h-16 px-4 shadow-md">
            <div className="flex items-center">
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                {/* <h1 className="hidden md:block text-xl font-semibold text-blue-600 ml-4">
                    Dashboard
                </h1> */}
            </div>

            <div className="flex items-center space-x-3">
                <CircleUser className="w-6 h-6" />
                <span className="hidden sm:block font-medium text-gray-700">
                    Admin User
                </span>
            </div>
        </header>
    )
}