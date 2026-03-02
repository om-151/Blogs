import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/solid";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchComments = async () => {
        try {
            const res = await axiosInstance.get("/blogs/comments");
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#d1d5db",
            confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/blogs/comments/${id}`);
                fetchComments();
                Swal.fire("Deleted!", "Comment removed successfully.", "success");
            } catch (err) {
                Swal.fire("Error!", "Could not delete comment.", "error");
            }
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    const columns = [
        {
            name: "User",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {row.client?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">
                            {row.client?.name || "-"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {row.client?.email || "-"}
                        </p>
                    </div>
                </div>
            ),
            grow: 2,
        },
        {
            name: "Blog",
            selector: (row) => row.blog?.title || "-",
            sortable: true,
            grow: 2,
        },
        {
            name: "Comment",
            cell: (row) => (
                <p className="text-gray-600 max-w-md truncate" title={row.text}>
                    {row.text}
                </p>
            ),
            grow: 2,
        },
        {
            name: "Date",
            selector: (row) => formatDate(row.createdAt),
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
            grow: 0,
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
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Comment Management
                </h2>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={comments}
                    pagination
                    highlightOnHover
                    responsive
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="py-12 text-gray-400">
                            No comments available.
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Comments;