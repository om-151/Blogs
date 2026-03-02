import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchClients = async () => {
        try {
            const res = await axiosInstance.get("/clients");
            setClients(res.data);
        } catch (err) {
            console.error("Error fetching clients:", err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This client account will be removed permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#d1d5db",
            confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/clients/${id}`);
                Swal.fire("Deleted!", "Client has been deleted.", "success");
                fetchClients();
            } catch (err) {
                const errorMsg = err.response?.data?.message || "Could not delete client.";
                Swal.fire("Error!", errorMsg, "error");
                console.error("Error deleting client:", err);
            }
        }
    };

    const columns = [
        {
            name: "",
            cell: (row) => (
                <div className="flex justify-center">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {row.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            ),
            width: "40px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Joined at",
            selector: (row) =>
                new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    onClick={() => handleDelete(row._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Delete Blog"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            ),
            width: "80px",
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
            },
        },
        rows: {
            style: {
                minHeight: "64px",
                borderBottom: "1px solid #f1f5f9",
            },
        },
        headCells: {
            style: {
                fontSize: "13px",
                color: "#6b7280",
            },
        },
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">User Management</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
                <DataTable
                    columns={columns}
                    data={clients}
                    pagination
                    customStyles={customStyles}
                    highlightOnHover
                    striped
                    responsive
                    noHeader
                />
            </div>
        </div>
    );
};

export default Clients;
