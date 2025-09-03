import React from "react";

const ContactPage = () => {
    return (
        <div className="mt-16 bg-gray-50 min-h-screen flex flex-col justify-center">
            {/* Header */}
            <section className="text-center py-10 px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Get in <span className="text-indigo-600">Touch</span>
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We’d love to hear from you! Fill out the form below or reach out directly to connect with our team.
                </p>
            </section>

            {/* Contact Section */}
            <section className="max-w-6xl mx-auto px-6 pb-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Send us a message
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-500 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info / Map */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Have questions or want to collaborate? Reach out to us through the form
                        or use the details below.
                    </p>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            📍 123 Blogger Street, Tech City, India
                        </p>
                        <p className="text-gray-700">📧 support@blogger.com</p>
                        <p className="text-gray-700">📞 +91 98765 43210</p>
                    </div>

                    {/* Optional Map */}
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            title="map"
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0198052681094!2d-122.41941558468183!3d37.7749292797596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064df9c879d%3A0xc8e4d6b5a0e0aabc!2sSan+Francisco!5e0!3m2!1sen!2sin!4v1674830200000!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
