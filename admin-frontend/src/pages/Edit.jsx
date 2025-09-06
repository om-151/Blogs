import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "./Forms";
import axios from "axios";

const EditBlogPage = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBlog(res.data))
            .catch((err) => console.error(err));
    }, [id, token]);

    const handleUpdate = async (formData) => {
        try {
            await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Blog updated successfully!");
        } catch (err) {
            console.error("Error updating blog:", err);
        }
    };

    return blog ? <BlogForm initialData={blog} onSubmit={handleUpdate} /> : <p>Loading...</p>;
};

export default EditBlogPage;
