export default function BlogCard({ blog }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-700">{blog.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{blog.description}</p>
                <button className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
                    Read More
                </button>
            </div>
        </div>
    );
}
