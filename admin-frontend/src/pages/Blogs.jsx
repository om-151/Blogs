import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Axios instance with Authorization header
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            const res = await axiosInstance.get("/blogs");
            setBlogs(res.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await axiosInstance.delete(`/blogs/${id}`);
                fetchBlogs(); // refresh list after delete
            } catch (err) {
                console.error("Error deleting blog:", err);
            }
        }
    };

    // Table Columns
    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Slug",
            selector: (row) => row.slug,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            wrap: true,
        },
        {
            name: "Author",
            selector: (row) => row.author?.name || "Unknown",
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/dashboard/blogs/edit/${row._id}`)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            {/* Header with Create Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Blog Management</h2>
                <button
                    onClick={() => navigate("/dashboard/blogs/create")}
                    className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-500 hover:cursor-pointer"
                >
                    Create
                </button>
            </div>

            {/* Blog Table */}
            <DataTable
                columns={columns}
                data={blogs}
                pagination
                highlightOnHover
                striped
                responsive
            />
        </div>
    );
};

export default BlogManagement;
