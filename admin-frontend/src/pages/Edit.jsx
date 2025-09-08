import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "./Forms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const EditBlogPage = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBlog(res.data))
            .catch((err) => console.error(err));
    }, [id, token]);

    const handleUpdate = async (formData) => {
        Swal.fire({
            title: 'Updating blog...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'Blog updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/dashboard/blogs");
            });

        } catch (err) {
            console.error("Error updating blog:", err);

            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the blog.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return blog ? <BlogForm initialData={blog} onSubmit={handleUpdate} /> : <p>Loading...</p>;
};

export default EditBlogPage;
