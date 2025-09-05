import { Bell } from "lucide-react";

export default function Navbar() {
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-10">
            {/* Left - Logo / Title */}
            <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>

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
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full border"
                    />
                    <span className="hidden sm:block text-gray-600">Admin</span>
                </div>
            </div>
        </div>
    );
}
