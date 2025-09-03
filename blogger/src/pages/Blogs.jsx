import BlogCard from "../components/BlogCard";

export default function Blogs() {
  const blogs = [
    { id: 1, title: "React Basics", description: "Learn the fundamentals of React.", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Tailwind CSS", description: "Style faster with Tailwind.", image: "https://via.placeholder.com/300" },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Latest Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
