import { LayoutDashboard, FileText, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ setIsAuthenticated }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/", { replace: true });
    };

    // Helper to check if path is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className={`${isOpen ? "w-64" : "w-20"} h-screen bg-indigo-700 text-white flex flex-col transition-all duration-300`}>
            {/* Header */}
            <div className={`flex items-center justify-${isOpen ? "between" : "center"} p-4 border-b border-indigo-500`}>
                {isOpen && (
                    <span className="text-2xl font-bold text-white">
                        Blogger
                    </span>
                )}
                <Menu
                    className="cursor-pointer text-white"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => navigate("/dashboard")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard") ? "bg-indigo-600" : "hover:bg-indigo-600"
                        }`}
                >
                    <LayoutDashboard size={20} />
                    {isOpen && "Dashboard"}
                </button>
                <button
                    onClick={() => navigate("/dashboard/blogs")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard/blogs") ? "bg-indigo-600" : "hover:bg-indigo-600"
                        }`}
                >
                    <FileText size={20} />
                    {isOpen && "Blog Management"}
                </button>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-indigo-500">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition bg-red-500"
                >
                    <LogOut size={20} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
