import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/solid";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchContacts = async () => {
        try {
            const res = await axiosInstance.get("/contacts");
            setContacts(res.data);
        } catch (err) {
            console.error("Error fetching contacts:", err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This contact entry will be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#d1d5db",
            confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/contacts/${id}`);
                Swal.fire("Deleted!", "Contact removed.", "success");
                fetchContacts();
            } catch (err) {
                const errorMsg = err.response?.data?.message || "Could not delete contact.";
                Swal.fire("Error!", errorMsg, "error");
                console.error("Error deleting contact:", err);
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
            grow: 1,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            grow: 1,
        },
        {
            name: "Message",
            selector: (row) => row.message,
            cell: (row) => (
                <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-lg" title={row.message}>
                    {row.message}
                </div>
            ),
            grow: 2,
        },
        {
            name: "Received",
            selector: (row) =>
                new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
            sortable: true,
            grow: 1,
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
            grow: 2,
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Messages</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
                <DataTable
                    columns={columns}
                    data={contacts}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    striped
                    responsive
                    noHeader
                    noDataComponent={
                        <div className="py-12 text-gray-400">
                            No Messages available.
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Contacts;
