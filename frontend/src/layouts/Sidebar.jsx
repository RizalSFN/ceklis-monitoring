import logo from "../assets/bagikopi.png"
import React from "react"
import {
    Home,
    MapPinned,
    ClipboardList,
    ClipboardCheck,
    NotebookPen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ sidebarOpen }) {
    const menus = [
        { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { name: "Area", path: "/area", icon: <MapPinned className="w-5 h-5" /> },
        { name: "Task", path: "/task", icon: <ClipboardList className="w-5 h-5" /> },
        { name: "Checklist", path: "/checklist", icon: <ClipboardCheck className="w-5 h-5" /> },
        { name: "Report", path: "/report", icon: <NotebookPen className="w-5 h-5" /> },
    ];

    const location = useLocation();

    return (
        <>
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-center h-160 text-blue-600 font-bold text-lg mt-5">
                    <img src={logo} alt="bagikopi-logo" className="w-7 h-7 mr-3" />
                    <p>Bagi Kopi</p>
                </div>
                <nav className="mt-5">
                    {menus.map((menu, i) => {
                        const isActive = location.pathname === menu.path;

                        return (
                            <Link
                                key={i}
                                to={menu.path}
                                className={`flex items-center px-6 py-3 transition ${isActive
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                                    }`}
                            >
                                {menu.icon}
                                <span className="ml-3">{menu.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    )
}