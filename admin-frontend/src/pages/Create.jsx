import BlogForm from "./Forms";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateBlogPage = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await axios.post("http://localhost:5000/api/blogs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Show success message using SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Blog created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/dashboard/blogs"); // Navigate after user confirms
            });

        } catch (err) {
            console.error("Error creating blog:", err);

            // Show error message using SweetAlert2
            Swal.fire({
                title: 'Error!',
                text: 'There was an error creating the blog.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return <BlogForm onSubmit={handleCreate} />;
};

export default CreateBlogPage;
