import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const blogDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const blogDay = blogDate.toDateString();
        const todayDay = today.toDateString();
        const yesterdayDay = yesterday.toDateString();

        if (blogDay === todayDay) {
            return "Today";
        } else if (blogDay === yesterdayDay) {
            return "Yesterday";
        } else {
            return blogDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <img
                src={blog.featuredImage ? `http://localhost:5000${blog.featuredImage}` : "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-[#6438C0] line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{blog.description}</p>
                <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                    <p>By <span className="font-medium text-gray-700">{blog.author.name}</span></p>
                    <p>{formatDate(blog.createdAt)}</p>
                </div>
                <button
                    onClick={() => navigate(`/blogs/${blog._id || blog.id}`)}
                    className="mt-4 relative inline-block px-4 py-2 rounded-lg border-2 border-purple-600 text-purple-600 overflow-hidden group hover:cursor-pointer"
                >
                    <span className="absolute inset-0 bg-purple-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative group-hover:text-white transition-colors duration-300 ease-out">
                        Read More
                    </span>
                </button>
            </div>
        </div>
    );
}
