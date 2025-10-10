import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

const ReportPage = () => {
    const [periode, setPeriode] = useState("harian");
    const [selectedDate, setSelectedDate] = useState("");
    const [report, setReport] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `http://localhost:5000/api/report?periode=${periode}&date=${selectedDate}`
            );
            setReport(response.data);
        } catch (error) {
            console.error("Gagal memuat data laporan:", error);
        } finally {
            setIsLoading(false);
        }
    }, [periode, selectedDate]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleExportPDF = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/report/export/pdf", {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Gagal mengekspor PDF:", error);
        }
    };

    const handleExportExcel = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/report/export/excel", {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Gagal mengekspor Excel:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar activeMenu="report" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-6">
                    <div className="bg-white rounded-2xl shadow p-5">
                        <div className="flex flex-wrap justify-between items-center mb-5">
                            <h1 className="text-2xl font-semibold text-gray-700">Laporan Checklist</h1>

                            {/* Filter & Export */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <select
                                    value={periode}
                                    onChange={(e) => setPeriode(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200">
                                    <option value="harian">Per Hari</option>
                                    <option value="mingguan">Per Minggu</option>
                                    <option value="bulanan">Per Bulan</option>
                                </select>

                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                                />

                                <button
                                    onClick={fetchReport}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                    <Download className="w-4 h-4" /> Tampilkan
                                </button>

                                <button
                                    onClick={handleExportPDF}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition">
                                    <FileText className="w-4 h-4" /> PDF
                                </button>

                                <button
                                    onClick={handleExportExcel}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition">
                                    <FileSpreadsheet className="w-4 h-4" /> Excel
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 text-left text-sm">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="p-3 border-b">No</th>
                                        <th className="p-3 border-b">Nama Petugas</th>
                                        <th className="p-3 border-b">Tanggal</th>
                                        <th className="p-3 border-b">Status</th>
                                        <th className="p-3 border-b">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="5" className="p-3 text-center text-gray-500">
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : report.length > 0 ? (
                                        report.map((item, index) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.nama_petugas}</td>
                                                <td className="p-3">{item.tanggal}</td>
                                                <td className="p-3">{item.status}</td>
                                                <td className="p-3">{item.catatan}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-3 text-center text-gray-500">
                                                Tidak ada data laporan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReportPage;
