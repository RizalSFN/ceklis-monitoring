import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

function Area() {
    const [area, setArea] = useState([
        { id: 1, name: "Rizal Sofiana", email: "rizal@example.com", role: "Admin" },
        { id: 2, name: "Budi Santoso", email: "budi@example.com", role: "User" },
        { id: 3, name: "Siti Aminah", email: "siti@example.com", role: "User" },
    ]);

    const handleEdit = (id) => {
        alert(`Edit user dengan id: ${id}`);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus user ini?")) {
            setArea(area.filter((u) => u.id !== id));
        }
    };

    const handleAdd = () => {
        alert("Fitur tambah user dipanggil");
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-blue-600">Users Management</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                >
                    <Plus className="w-5 h-5" /> Tambah User
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">Nama</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {area.length > 0 ? (
                            area.map((area, index) => (
                                <tr key={area.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{area.name}</td>
                                    <td className="px-4 py-3">{area.email}</td>
                                    <td className="px-4 py-3">{area.role}</td>
                                    <td className="px-4 py-3 flex items-center gap-3 justify-center">
                                        <button
                                            onClick={() => handleEdit(area.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(area.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    Belum ada data area
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Area;
