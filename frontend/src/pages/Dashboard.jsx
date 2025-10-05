import { useState } from "react";
import {
    Menu,
    X,
    Home,
    Users,
    FileText,
    Settings,
} from "lucide-react";
import logo from "../assets/bagikopi.png"
import { Link } from "react-router-dom";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menus = [
        { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { name: "Users", path: "/users", icon: <Users className="w-5 h-5" /> },
        { name: "Reports", path: "/reports", icon: <FileText className="w-5 h-5" /> },
        { name: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-center h-160 text-blue-600 font-bold text-lg mt-5">
                    <img src={logo} alt="bagikopi-logo" className="w-7 h-7 mr-3" />
                    <p>Bagi Kopi</p>
                </div>
                <nav className="mt-5">
                    {menus.map((menu, i) => (
                        <Link
                            key={i}
                            to={menu.path}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                            {menu.icon}
                            <span className="ml-3">{menu.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="flex items-center justify-between bg-white h-16 px-4 shadow-md">
                    <div className="flex items-center">
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h1 className="hidden md:block text-xl font-semibold text-blue-600 ml-4">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Profile"
                            className="w-9 h-9 rounded-full"
                        />
                        <span className="hidden sm:block font-medium text-gray-700">
                            Admin User
                        </span>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome back 👋</h2>
                    <p className="mt-2 text-gray-600">
                        Dashboard admin ini cuyyy 🤙
                    </p>

                    {/* Dummy cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div className="bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Total Area</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">6</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Reports</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">34</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Sales</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">$5,240</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Feedback</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">87</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
