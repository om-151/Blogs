import BlogForm from "./Forms";
import axios from "axios";

const CreateBlogPage = () => {
    const token = localStorage.getItem("token");

    const handleCreate = async (formData) => {
        try {
            await axios.post("http://localhost:5000/api/blogs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Blog created successfully!");
        } catch (err) {
            console.error("Error creating blog:", err);
        }
    };

    return <BlogForm onSubmit={handleCreate} />;
};

export default CreateBlogPage;
