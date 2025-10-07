import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} />

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
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                            <h3 className="text-lg font-semibold text-gray-700">Total Task</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">34</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Task Completed</h3>
                            <p className="text-2xl text-blue-600 font-bold mt-2">20</p>
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
