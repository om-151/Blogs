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
        return <div className="text-center text-gray-500 mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-20">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 mt-16">
            <header className="relative w-full h-100 overflow-hidden bg-gray-200">
                <img
                    src={blog.featuredImage ? `http://localhost:5000${blog.featuredImage}` : "https://via.placeholder.com/1200x500"}
                    alt={blog.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 bg-opacity-20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-semibold">{blog.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm md:text-base opacity-90">
                        <span>By <span className="font-semibold">{blog.author.name}</span></span>
                        <span>• {new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>• {blog.published ? "Published" : "Draft"}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section>
                    <p className="text-lg text-gray-700">{blog.description}</p>
                </section>

                <section className="prose prose-sm sm:prose lg:prose-lg mx-auto max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </section>

                <section className="text-sm text-gray-500 border-t border-gray-300 pt-4">
                    Last updated: {new Date(blog.updatedAt).toLocaleString()}
                </section>
            </main>
        </div>
    );
}
