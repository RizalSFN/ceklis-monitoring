import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Layout from "../layouts/Layout";
import api from "../api/axios";
import Swal from "sweetalert2";

function Task() {
    const [task, setTask] = useState([])
    const [area, setArea] = useState([])
    const [id, setId] = useState(null)
    const [areaName, setAreaName] = useState("")
    const [areaDescription, setAreaDescription] = useState("")
    const [areaId, setAreaId] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [editId, setEditId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)

    const fetchTask = useCallback(async () => {
        setIsLoading(true)

        try {
            const res = await api.get("/api/task", { areaId, name, description })
            setTask(res.data.data)
        } catch (error) {
            Swal.fire("Gagal!", "Gagal memuat data task", "error")
            console.log("Terjadi kesalahan : ", error);
        } finally {
            setIsLoading(false)
        }
    }, [areaId, name, description])

    const fetchAreaData = async () => {
        try {
            const res = await api.get("/api/area", { id, areaName, areaDescription })
            setArea(res.data.data)
        } catch (error) {
            Swal.fire("Gagal!", "Gagal memuat data area", "error")
            console.log("Terjadi kesalahan : ", error);
        }
    }

    useEffect(() => {
        fetchTask()
    }, [fetchTask])

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            await api.post("/api/task/create", { areaId, name, description })
            setIsCreateOpen(false)
            setAreaId(null)
            setName("")
            setDescription("")

            Swal.fire("Berhasil!", "Berhasil menambahkan data task", "success")
            fetchTask()
        } catch (error) {
            Swal.fire("Gagal!", "Gagal menambah data task", "error")
            console.log("Terjadi kesalahan : ", error);
        }
    }

    const handleEdit = async (task) => {
        setEditId(task.id)
        setAreaId(task.Area.id)
        setId(task.Area.id)
        setName(task.name)
        setDescription(task.description)
        fetchAreaData()
        setIsEditOpen(true)
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Tugas</h1>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari tugas..."
                        className="border rounded-md px-3 py-2 w-full sm:w-1/3 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Tambah Tugas
                    </button>
                </div>

                {/* modal tambah task */}
                {isCreateOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                Tambah Tugas Baru
                            </h2>

                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="area"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Area
                                    </label>
                                    <select
                                        id="area"
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Area</option>
                                        <option value="admin">Toilet</option>
                                        <option value="staff">Kitchen</option>
                                        <option value="user">Mushola</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Masukkan nama tugas"
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Deskripsi
                                    </label>
                                    <input
                                        id="description"
                                        type="text"
                                        placeholder="Masukkan deskripsi tugas"
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-60"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3">Task ID</th>
                                    <th className="p-3">Area ID</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Deskripsi</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task.map((u, index) => (
                                    <tr key={u.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}.</td>
                                        <td className="p-3">{u.id}</td>
                                        <td className="p-3">{u.Area.id}</td>
                                        <td className="p-3">{u.name}</td>
                                        <td className="p-3">{u.description}</td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(u)}
                                                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setIsConfirmDelete(true)}
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal edit task */}
                        {isEditOpen && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                        Edit Data Tugas
                                    </h2>

                                    <form onSubmit={handleAdd} className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="area"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Area
                                            </label>
                                            <select
                                                id="area"
                                                value={id}
                                                onChange={(e) => setId(e.target.value)}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            >
                                                <option value="">Pilih Area</option>
                                                {area.map((areaData) => (
                                                    <option key={areaData.id} value={areaData.id}>{areaData.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nama
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Masukkan nama tugas"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Deskripsi
                                            </label>
                                            <input
                                                id="description"
                                                type="text"
                                                placeholder="Masukkan deskripsi tugas"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditOpen(false)}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* pop up konfirmasi delete */}
                        {isConfirmDelete && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Konfirmasi Hapus
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Apakah kamu yakin ingin menghapus{" "}
                                        <span className="font-semibold">"data ini"</span>?
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setIsConfirmDelete(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Ya, Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Task;
