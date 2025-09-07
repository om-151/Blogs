import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load blog.");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500 mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={blog.featuredImage ? `http://localhost:5000${blog.featuredImage}` : "https://via.placeholder.com/600x300"}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-purple-700 mb-3">{blog.title}</h1>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div>By <span className="font-medium">{blog.author.name}</span></div>
                        <div>• {new Date(blog.createdAt).toLocaleDateString()}</div>
                        <div>• {blog.published ? "Published" : "Draft"}</div>
                    </div>

                    <p className="text-gray-700 mb-4">{blog.description}</p>

                    <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <div className="mt-6 text-right text-gray-400 text-xs">
                        Last updated: {new Date(blog.updatedAt).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
    