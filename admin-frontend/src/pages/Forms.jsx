import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@yaireo/tagify/dist/tagify.css";
import Tags from "@yaireo/tagify/dist/react.tagify";

const BlogForm = ({ initialData = {}, onSubmit }) => {
    const API_BASE = "http://localhost:5000";
    const [title, setTitle] = useState(initialData.title || "");
    const [slug, setSlug] = useState(initialData.slug || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [content, setContent] = useState(initialData.content || "");
    const [tags, setTags] = useState(initialData.tags || []);
    const [image, setImage] = useState(initialData.featuredImage || null);
    const [preview, setPreview] = useState(
        initialData.featuredImage ? `${API_BASE}${initialData.featuredImage}` : null
    );

    const [errors, setErrors] = useState({});

    // Auto-generate slug from title
    useEffect(() => {
        if (title) {
            setSlug(
                title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "")
            );
        }
    }, [title]);

    useEffect(() => {
        if (initialData.featuredImage) {
            setPreview(`${API_BASE}${initialData.featuredImage}`);
            setImage(null); // reset file input until user uploads a new one
        }
    }, [initialData]);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Form validation
    const validateForm = () => {
        let newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (!content.trim()) newErrors.content = "Content is required";
        if (!tags.length) newErrors.tags = "At least one tag is required";
        if (!image && !initialData._id) newErrors.image = "Featured image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tags));
        if (image) {
            formData.append("featuredImage", image);
        }

        onSubmit(formData); // parent handles API call
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl p-4 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
                {initialData._id ? "Update Blog" : "Create Blog"}
            </h2>

            {/* Title */}
            <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
                <label className="block mb-1 font-medium">Slug</label>
                <input
                    type="text"
                    value={slug}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                )}
            </div>

            {/* Content */}
            <div>
                <label className="block mb-1 font-medium">Content</label>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    theme="snow"
                    className="bg-white"
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                )}
            </div>

            {/* Tags */}
            <div>
                <label className="block mb-1 font-medium">Tags</label>
                <Tags
                    value={tags}
                    onChange={(e) =>
                        setTags(e.detail.tagify.value.map((tag) => tag.value))
                    }
                    className="w-full border rounded p-2"
                />
                {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>

            {/* Image Uploader */}
            {/* Image Uploader */}
            <div>
                <label className="block mb-1 font-medium">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 transition cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-40 w-auto rounded border object-contain"
                            />
                        ) : (
                            <span>Click to upload an image</span>
                        )}
                    </label>
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
                {initialData._id ? "Update Blog" : "Create Blog"}
            </button>
        </form>
    );
};

export default BlogForm;
