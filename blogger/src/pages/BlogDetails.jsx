import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";

export default function BlogDetails({ clientAuth }) {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [clientInfo, setClientInfo] = useState(null);
    const clientToken = clientAuth?.token || localStorage.getItem("clientToken");
    const isLiked =
        blog?.likes?.some(
            (likeUser) => likeUser._id === clientInfo?.id
        );

    useEffect(() => {
        // decode client info from token
        if (clientToken) {
            try {
                const decoded = JSON.parse(atob(clientToken.split('.')[1]));
                setClientInfo(decoded);
            } catch (e) {
                console.error('Could not decode token', e);
            }
        }
    }, [clientToken]);

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

        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}/comments`);
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments", err);
            }
        };

        fetchBlog();
        fetchComments();
    }, [id]);

    const handleLike = async () => {
        if (!clientToken) {
            alert('Please login to like this post');
            return;
        }
        // console.log(blog?.isLiked, 'KKKKKKKKK')
        try {
            await axios.post(
                `http://localhost:5000/api/blogs/${id}/like`,
                {},
                { headers: { Authorization: `Bearer ${clientToken}` } }
            );
            // reload blog to update like count
            const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
            setBlog(res.data);
        } catch (err) {
            console.error('Error liking blog', err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!clientToken) {
            alert('Please login to comment');
            return;
        }
        if (!newComment.trim()) return;
        try {
            await axios.post(
                `http://localhost:5000/api/blogs/${id}/comments`,
                { text: newComment },
                { headers: { Authorization: `Bearer ${clientToken}` } }
            );
            setNewComment("");
            const res = await axios.get(`http://localhost:5000/api/blogs/${id}/comments`);
            setComments(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Error posting comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await axios.delete(
                `http://localhost:5000/api/blogs/client-comments/${commentId}`,
                { headers: { Authorization: `Bearer ${clientToken}` } }
            );
            const res = await axios.get(`http://localhost:5000/api/blogs/${id}/comments`);
            setComments(res.data);
        } catch (err) {
            alert('Error deleting comment');
        }
    };

    const handleEditComment = async (commentId, newText) => {
        if (!newText.trim()) return;
        try {
            await axios.put(
                `http://localhost:5000/api/blogs/client-comments/${commentId}`,
                { text: newText },
                { headers: { Authorization: `Bearer ${clientToken}` } }
            );
            setEditingCommentId(null);
            const res = await axios.get(`http://localhost:5000/api/blogs/${id}/comments`);
            setComments(res.data);
        } catch (err) {
            alert('Error updating comment');
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500 mt-20">Loading...</div>;
    }

    if (error || !blog) {
        return <div className="text-center text-red-500 mt-20">{error || "Blog not found"}</div>;
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
                        <span>By <span className="font-semibold">{blog?.author?.name || "Unknown"}</span></span>
                        <span>• {new Date(blog?.createdAt).toLocaleDateString()}</span>
                        <span>• {blog?.published ? "Published" : "Draft"}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <section>
                    <p className="text-lg text-gray-700">{blog?.description}</p>
                </section>

                <section className="prose prose-sm sm:prose lg:prose-lg mx-auto max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
                </section>

                <section className="mt-8 flex items-center gap-3">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-2 transition cursor-pointer"
                    >
                        <Heart
                            size={22}
                            fill={isLiked ? "currentColor" : "none"}
                            className={`transition ${isLiked
                                ? "text-red-500"
                                : "text-gray-500"
                                }`}
                        />
                    </button>

                    <span className="text-sm font-medium text-gray-600">
                        {blog?.likes?.length || 0} likes
                    </span>
                </section>

                <section className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-2xl font-semibold mb-8 text-[#6438C0]">
                        Comments ({comments.length})
                    </h3>

                    {/* Login Notice */}
                    {!clientToken && (
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 text-sm text-indigo-700">
                            Please{" "}
                            <a href="/login" className="font-semibold underline">
                                Login
                            </a>{" "}
                            to do Comment on this blog.
                        </div>
                    )}

                    {/* Comment Form */}
                    {clientToken && (
                        <form
                            onSubmit={handleCommentSubmit}
                            className="mb-10 bg-gray-50 border border-gray-200 rounded-2xl p-5"
                        >
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write something thoughtful..."
                                rows="3"
                                className="w-full bg-transparent resize-none focus:outline-none text-gray-700 placeholder-gray-400"
                                required
                            />

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-[#6438C0] text-white rounded-xl text-sm font-medium hover:bg-indigo-800 transition shadow-sm cursor-pointer"
                                >
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Comment List */}
                    {comments.length > 0 ? (
                        <div className="space-y-8">
                            {comments.map((c) => {
                                const isOwner = clientInfo?.id === c?.client?._id;

                                return (
                                    <div key={c._id} className="flex gap-4">

                                        {/* Avatar */}
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                                            {c?.client?.name?.charAt(0)?.toUpperCase() || "A"}
                                        </div>

                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {c?.client?.name || "Anonymous"}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(c.createdAt).toLocaleString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })}
                                                    </p>
                                                </div>

                                                {isOwner && (
                                                    <div className="flex gap-4 text-sm">
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(c._id);
                                                                setEditingText(c.text);
                                                            }}
                                                            className="text-[#6438C0] hover:text-indigo-800 transition cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteComment(c._id)}
                                                            className="text-red-500 hover:text-red-600 transition cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Body */}
                                            <div className="mt-3">
                                                {editingCommentId === c._id ? (
                                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                                                        <textarea
                                                            value={editingText}
                                                            onChange={(e) => setEditingText(e.target.value)}
                                                            rows="3"
                                                            className="w-full bg-transparent resize-none focus:outline-none"
                                                        />

                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditComment(c._id, editingText)
                                                                }
                                                                className="px-4 py-1.5 border border-[#6438C0] text-[#6438C0] rounded-lg text-sm hover:bg-[#6438C0] hover:text-white transition cursor-pointer"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingCommentId(null)}
                                                                className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300 transition cursor-pointer"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {c?.text}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            No comments yet. Start the conversation.
                        </div>
                    )}
                </section>

                <section className="text-sm text-gray-500 border-t border-gray-300 pt-4">
                    Last updated: {new Date(blog?.updatedAt).toLocaleString()}
                </section>
            </main>
        </div>
    );
}
