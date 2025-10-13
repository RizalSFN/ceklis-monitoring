import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Layout from "../layouts/Layout";
import api from "../api/axios";
import Swal from "sweetalert2"

function Area() {
    const [area, setArea] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [editId, setEditId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const fetchArea = async () => {
        setIsLoading(true)

        try {
            const res = await api.get("/api/area")
            setArea(res.data.data)

        } catch (error) {
            Swal.fire("Gagal!", "Gagal memuat data area", "error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchArea()
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            await api.post("/api/area/create", { name, description })
            setIsCreateOpen(false)
            setName("")
            setDescription("")

            Swal.fire("Berhasil!", "Berhasil menambahkan data area", "success")
            fetchArea()
        } catch (error) {
            Swal.fire("Gagal!", "Gagal menambahkan data area", "error")
        }
    }

    const handleEdit = async (area) => {
        setEditId(area.id)
        setName(area.name)
        setDescription(area.description)
        setIsEditOpen(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            await api.put(`/api/area/${editId}`, { name, description })
            setIsEditOpen(false)
            setEditId(null)

            Swal.fire("Berhasil!", "Berhasil mengedit data area", "success")
            fetchArea()
        } catch (error) {
            Swal.fire("Gagal!", "Gagal mengedit data area", "error")
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/api/area/${editId}`)
            setIsDeleteOpen(false)
            setEditId(null)

            Swal.fire("Berhasil!", "Berhasil menghapus data area", "success")
            fetchArea()
        } catch (error) {
            Swal.fire("Gagal!", "Gagal menghapus data area", "error")
        }

    }

    return (
        <Layout>
            {/* <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">Area Management</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <Plus className="w-5 h-5" /> Tambah Area
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-3 text-left">No</th>
                                <th className="px-4 py-3 text-left">Nama</th>
                                <th className="px-4 py-3 text-left">Deskripsi</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {area.length > 0 ? (
                                area.map((area, index) => (
                                    <tr key={area.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{area.name}</td>
                                        <td className="px-4 py-3">{area.description}</td>
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
            </div> */}
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Area</h1>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Cari area..."
                        className="border rounded-md px-3 py-2 w-full sm:w-1/3 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => {
                            setEditId(null)
                            setName("")
                            setDescription("")
                            setIsCreateOpen(true)
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Tambah Area
                    </button>
                </div>

                {/* modal tambah area */}
                {isCreateOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                Tambah Area Baru
                            </h2>

                            <form onSubmit={handleAdd} className="space-y-4">
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
                                        placeholder="Masukkan nama area"
                                        onChange={(e) => setName(e.target.value)}
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
                                        placeholder="Masukkan deskripsi area"
                                        onChange={(e) => setDescription(e.target.value)}
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
                                    <th className="p-3">Area ID</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Deskripsi</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {area.map((u, index) => (
                                    <tr key={u.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}.</td>
                                        <td className="p-3">{u.id}</td>
                                        <td className="p-3">{u.name}</td>
                                        <td className="p-3">{u.description}</td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(u)}
                                                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsDeleteOpen(true)
                                                    setEditId(u.id)
                                                }}
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal edit area */}
                        {isEditOpen && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                        Edit Data Area
                                    </h2>

                                    <form onSubmit={handleUpdate} className="space-y-4">
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
                                                placeholder="Masukkan nama area"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
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
                                                placeholder="Masukkan deskripsi area"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
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
                        {isDeleteOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        Konfirmasi Hapus
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Apakah kamu yakin ingin menghapus data ini?
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setIsDeleteOpen(false)
                                                setEditId(null)
                                            }}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={() => handleDelete()}
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

export default Area;
