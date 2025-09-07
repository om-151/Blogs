import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
                src={blog.featuredImage ? `http://localhost:5000${blog.featuredImage}` : "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-700">{blog.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{blog.description}</p>
                <button
                    onClick={() => navigate(`/blogs/${blog._id || blog.id}`)}
                    className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                >
                    Read More
                </button>
            </div>
        </div>
    );
}
