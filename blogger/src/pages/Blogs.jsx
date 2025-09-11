import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data);

                // Extract unique tags from all blogs
                const tags = res.data.flatMap((blog) => blog.tags || []);
                const uniqueTags = [...new Set(tags)];
                setAllTags(uniqueTags);
            } catch (err) {
                setError("Failed to load blogs. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on search term and selected tag
    const filteredBlogs = blogs.filter((blog) => {
        const titleMatch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const descMatch = blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const tagMatch = selectedTag ? blog.tags.includes(selectedTag) : true;
        return (titleMatch || descMatch) && tagMatch;
    });

    return (
        <section className="max-w-6xl mx-auto p-6 mt-14">
            <h2 className="text-3xl font-bold text-center mb-5">Read Latest Blog Posts</h2>
            <h2 className="text-2xl font-semibold mb-6 text-[#6438C0] text-center">Explore - Learn - Grow</h2>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6438C0]"
                />

                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6438C0] cursor-pointer"
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="border-8 border-gray-300 border-t-8 border-t-[#6438C0] rounded-full w-16 h-16 mx-auto mb-4 animate-spin"></div>
                        <p className="text-gray-600 text-lg font-medium">Loading blogs...</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && !loading && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500 text-center">{error}</p>
                </div>
            )}

            {/* Blogs List */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
                            <BlogCard key={blog._id || blog.id} blog={blog} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">No blogs found.</p>
                    )}
                </div>
            )}
        </section>
    );
}
