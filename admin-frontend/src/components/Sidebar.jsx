import { LayoutDashboard, FileText, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setIsAuthenticated }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <div
            className={`${isOpen ? "w-64" : "w-20"
                } h-screen bg-indigo-700 text-white flex flex-col transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-indigo-500">
                <span className={`${!isOpen && "hidden"} text-2xl font-bold`}>
                    Admin Panel
                </span>
                <Menu
                    className="cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-2">
                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    <LayoutDashboard size={20} />
                    {isOpen && "Dashboard"}
                </a>
                <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    <FileText size={20} />
                    {isOpen && "Blog Management"}
                </a>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-indigo-500">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
