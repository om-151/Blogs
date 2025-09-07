import { Bell, User } from "lucide-react";

export default function Navbar() {
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-10">
            {/* Left - Logo / Title */}
            <h2 className="text-xl font-semibold text-gray-700">Blogger Admin panel</h2>

            {/* Right - Search + Notifications + Profile */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="hidden md:block px-3 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="relative">
                    <Bell className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                </button>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                    <User className="w-5 h-5 text-gray-500 hover:text-indigo-600" />
                    <span className="hidden sm:block text-gray-600 font-medium">Admin</span>
                </div>
            </div>
        </div>
    );
}
