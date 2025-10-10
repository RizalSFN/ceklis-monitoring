import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";

const Checklist = () => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Contoh dummy fetch data (nanti ganti pakai API kamu)
        setAreas([
            {
                id: 1,
                name: "Kitchen",
                tasks: [
                    { id: 1, name: "Bersihkan meja", done: false },
                    { id: 2, name: "Cuci piring", done: true },
                ],
            },
            {
                id: 2,
                name: "Toilet",
                tasks: [
                    { id: 3, name: "Pel lantai", done: false },
                    { id: 4, name: "Isi sabun", done: true },
                ],
            },
        ]);
    }, []);

    const toggleTask = (areaId, taskId) => {
        setAreas((prev) =>
            prev.map((area) =>
                area.id === areaId
                    ? {
                        ...area,
                        tasks: area.tasks.map((task) =>
                            task.id === taskId ? { ...task, done: !task.done } : task
                        ),
                    }
                    : area
            )
        );
    };

    return (
        <Layout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Checklist Tugas</h1>

                {/* Board Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area) => (
                        <div
                            key={area.id}
                            className="bg-white shadow-md rounded-xl p-4 flex flex-col border-t-4 border-blue-500"
                        >
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                {area.name}
                            </h2>

                            {/* Task List */}
                            <div className="space-y-2">
                                {area.tasks.map((task) => (
                                    <label
                                        key={task.id}
                                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${task.done ? "bg-green-50" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={() => toggleTask(area.id, task.id)}
                                            className="w-5 h-5 accent-blue-600"
                                        />
                                        <span
                                            className={`text-gray-700 ${task.done ? "line-through text-gray-400" : ""
                                                }`}
                                        >
                                            {task.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Checklist;
