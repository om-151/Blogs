import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setNavOpen(!navOpen);

    const links = [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full shadow-md fixed top-0 left-0 bg-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#6438C0]">
                    <Link to="/">Blogger</Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`font-medium transition-colors duration-300 ${location.pathname === link.href
                                    ? "text-[#6438C0] underline"
                                    : "text-gray-700 hover:text-purple-800"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-2xl text-gray-700">
                        {navOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {navOpen && (
                <div className="md:hidden bg-white px-4 pb-4 shadow-md">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`block py-2 font-medium transition ${location.pathname === link.href
                                    ? "text-[#6438C0] underline"
                                    : "text-gray-700 hover:text-purple-800"
                                }`}
                            onClick={() => setNavOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;

