import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Stat Cards */}
                    {[
                        { title: "Total Blogs", value: 120 },
                        { title: "Active Users", value: 85 },
                        { title: "Pending Reviews", value: 14 },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-gray-600 text-sm font-medium">{item.title}</h3>
                            <p className="text-2xl font-bold text-indigo-600">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
