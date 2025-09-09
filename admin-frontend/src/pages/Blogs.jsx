import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/blogs/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your blog has been deleted.',
                    'success'
                );
                fetchBlogs();
            } catch (err) {
                console.error("Error deleting blog:", err);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the blog.',
                    'error'
                );
            }
        }
    };

    const columns = [
        {
            name: "Image",
            selector: (row) => row.featuredImage,
            cell: (row) => (
                <img
                    src={`http://localhost:5000${row.featuredImage}`}
                    alt={row.title}
                    className="w-32 h-16 object-cover rounded-md p-2"
                />
            ),
            // width: "100px",
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            grow: 1,
            width: "400px",
        },
        {
            name: "Slug",
            selector: (row) => row.slug,
            grow: 0,
            width: "120px",
        },
        {
            name: "Description",
            selector: (row) => row.description,
            cell: (row) => (
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.description}
                </div>
            ),
            width: "250px",
            grow: 2,
        },
        {
            name: "Author",
            selector: (row) => row.author?.name || "Unknown",
            cell: (row) => (
                <div className="max-w-[80px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.author?.name || "Unknown"}
                </div>
            ),
            width: "80px",
            grow: 0,
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
            grow: 0,
            width: "150px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => navigate(`/dashboard/blogs/edit/${row._id}`)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit Blog"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete Blog"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            ),
            width: "80px",
            grow: 0,
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Blog Management</h2>
                <button
                    onClick={() => navigate("/dashboard/blogs/create")}
                    className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Create</span>
                </button>
            </div>

            {/* DataTable */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <DataTable
                    columns={columns}
                    data={blogs}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    noHeader
                />
            </div>
        </div>
    );
};

export default BlogManagement;
