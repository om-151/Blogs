import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data); // assuming API returns an array of blog objects
                setLoading(false);
            } catch (err) {
                setError("Failed to load blogs.");
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Latest Blogs</h2>
            
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id || blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </section>
    );
}
