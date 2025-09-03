import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">MyBlog</h2>
                        <p className="mt-3 text-gray-400">
                            Sharing knowledge, stories, and ideas for everyone.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-purple-400 transition">Home</a>
                            </li>
                            <li>
                                <a href="/blogs" className="hover:text-purple-400 transition">Blogs</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-purple-400 transition">About</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-purple-400 transition">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-5">
                            <a href="#" className="hover:text-purple-400 transition">
                                <Facebook />
                            </a>
                            <a href="#" className="hover:text-purple-400 transition">
                                <Twitter />
                            </a>
                            <a href="#" className="hover:text-purple-400 transition">
                                <Instagram />
                            </a>
                            <a href="#" className="hover:text-purple-400 transition">
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} MyBlog. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
