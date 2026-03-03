import { LayoutDashboard, FileText, MessageSquare, Users, Mail, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Sidebar({ setIsAuthenticated }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6438C0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/", { replace: true });

                MySwal.fire({
                    title: 'Logged out!',
                    text: 'You have been logged out successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Helper to check if path is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className={`${isOpen ? "w-64" : "w-20"} h-screen bg-[#6438C0] text-white flex flex-col transition-all duration-300`}>
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
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard") ? "bg-purple-600" : "hover:bg-purple-600"
                        }`}
                >
                    <LayoutDashboard size={20} />
                    {isOpen && "Dashboard"}
                </button>
                <button
                    onClick={() => navigate("/dashboard/blogs")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard/blogs") ? "bg-purple-600" : "hover:bg-purple-600"
                        }`}
                >
                    <FileText size={20} />
                    {isOpen && "Blog Management"}
                </button>
                <button
                    onClick={() => navigate("/dashboard/comments")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard/comments") ? "bg-purple-600" : "hover:bg-purple-600"
                        }`}
                >
                    <MessageSquare size={20} />
                    {isOpen && "Comments"}
                </button>
                <button
                    onClick={() => navigate("/dashboard/clients")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard/clients") ? "bg-purple-600" : "hover:bg-purple-600"
                        }`}
                >
                    <Users size={20} />
                    {isOpen && "Users"}
                </button>
                <button
                    onClick={() => navigate("/dashboard/contacts")}
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left transition cursor-pointer ${isActive("/dashboard/contacts") ? "bg-purple-600" : "hover:bg-purple-600"
                        }`}
                >
                    <Mail size={20} />
                    {isOpen && "Contacts"}
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
