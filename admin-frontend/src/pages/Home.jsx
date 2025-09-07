import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Users, CheckCircle2 } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, CartesianGrid
} from "recharts";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load blogs");
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const stats = [
        {
            title: "Total Blogs",
            value: blogs.length,
            icon: <FileText size={32} className="text-indigo-500" />,
        },
        {
            title: "Active Users",
            value: 85,
            icon: <Users size={32} className="text-green-500" />,
        },
        {
            title: "Pending Reviews",
            value: 14,
            icon: <CheckCircle2 size={32} className="text-yellow-500" />,
        },
    ];

    // Static data for charts
    const barData = [
        { name: "Jan", blogs: 12 },
        { name: "Feb", blogs: 18 },
        { name: "Mar", blogs: 10 },
        { name: "Apr", blogs: 22 },
        { name: "May", blogs: 15 },
    ];

    const pieData = [
        { name: "Published", value: 70 },
        { name: "Drafts", value: 30 },
    ];

    const lineData = [
        { name: "Week 1", users: 30 },
        { name: "Week 2", users: 45 },
        { name: "Week 3", users: 60 },
        { name: "Week 4", users: 50 },
    ];

    const areaData = [
        { name: "Mon", visitors: 400 },
        { name: "Tue", visitors: 300 },
        { name: "Wed", visitors: 500 },
        { name: "Thu", visitors: 200 },
        { name: "Fri", visitors: 278 },
        { name: "Sat", visitors: 300 },
        { name: "Sun", visitors: 450 },
    ];

    const COLORS = ["#4f46e5", "#facc15"];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {stats.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 border-indigo-500"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-indigo-50 rounded-full">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
                                        <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Grid – Two per row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Bar Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-md h-[350px]">
                            <h3 className="text-lg font-semibold text-gray-700">Monthly Blogs</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" stroke="#8884d8" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="blogs" fill="#4f46e5" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-md h-[350px]">
                            <h3 className="text-lg font-semibold text-gray-700">Blog Status</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Line Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-md h-[350px]">
                            <h3 className="text-lg font-semibold text-gray-700">Weekly Users</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <XAxis dataKey="name" stroke="#8884d8" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Area Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-md h-[350px]">
                            <h3 className="text-lg font-semibold text-gray-700">Daily Visitors</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={areaData}>
                                    <XAxis dataKey="name" stroke="#8884d8" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="visitors" stroke="#4f46e5" fill="#c7d2fe" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
