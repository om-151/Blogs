import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 text-2xl font-bold text-purple-700">
                        MyBlog
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-700 hover:text-purple-700 transition">
                            Home
                        </a>
                        <a href="/blogs" className="text-gray-700 hover:text-purple-700 transition">
                            Blogs
                        </a>
                        <a href="/about" className="text-gray-700 hover:text-purple-700 transition">
                            About
                        </a>
                        <a href="/contact" className="text-gray-700 hover:text-purple-700 transition">
                            Contact
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                        <a
                            href="/"
                            className="block text-gray-700 hover:text-purple-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </a>
                        <a
                            href="/blogs"
                            className="block text-gray-700 hover:text-purple-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Blogs
                        </a>
                        <a
                            href="/about"
                            className="block text-gray-700 hover:text-purple-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className="block text-gray-700 hover:text-purple-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
