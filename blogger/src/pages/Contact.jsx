import React, { useState } from "react";
import axios from "axios";
import { MapPin, Mail, Phone } from "lucide-react";
import Swal from "sweetalert2";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Remove error while typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // Validation Function
    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!form.message.trim()) {
            newErrors.message = "Message is required";
        } else if (form.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        return newErrors;
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/contacts", form);

            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Your message has been sent successfully.",
                confirmButtonColor: "#6438C0",
            });

            setForm({ name: "", email: "", message: "" });
            setErrors({});
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    err.response?.data?.message ||
                    "Failed to send message. Please try again.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center">

            {/* Header */}
            <section className="text-center py-12 px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Get in <span className="text-purple-700">Touch</span>
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
                </p>
            </section>

            {/* Contact Section */}
            <section className="max-w-6xl mx-auto px-6 pb-12 grid md:grid-cols-2 gap-12 items-center">

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Send a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition ${errors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-purple-600"
                                    } focus:ring-1`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition ${errors.email
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-purple-600"
                                    } focus:ring-1`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition ${errors.message
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-purple-600"
                                    } focus:ring-1`}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 text-white rounded-xl font-medium shadow-md transition cursor-pointer duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#6438C0] hover:bg-[#6338c0ea]"
                                }`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Contact Information
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Feel free to reach out through the form or using the contact details below.
                    </p>

                    <div className="space-y-3 text-gray-700">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[#6438C0]" />
                            <p>123 Blogger Street, Tech City, India</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#6438C0]" />
                            <p>support@blogger.com</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#6438C0]" />
                            <p>+91 98765 43210</p>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            title="map"
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0198052681094!2d-122.41941558468183!3d37.7749292797596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064df9c879d%3A0xc8e4d6b5a0e0aabc!2sSan+Francisco!5e0!3m2!1sen!2sin!4v1674830200000!5m2!1sen!2sin"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;