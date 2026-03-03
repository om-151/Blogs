import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Users, MessageCircle, Mail, BarChart3 } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, CartesianGrid, Legend
} from "recharts";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [stats, setStats] = useState(null);
    const [charts, setCharts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: { Authorization: `Bearer ${token}` },
    });

    const fetchDashboardData = async () => {
        setLoading(true);
        if (!token) {
            setError("Not authenticated. Please sign in.");
            setLoading(false);
            setTimeout(() => navigate("/", { replace: true }), 500);
            return;
        }
        try {
            const res = await axiosInstance.get("/dashboard/stats");
            setStats(res.data.stats);
            setCharts(res.data.charts);
            setError("");
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(err.response?.data?.message || err.message || "Failed to load dashboard data");
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem("token");
                setTimeout(() => navigate("/", { replace: true }), 700);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefresh = () => fetchDashboardData();

    const statCards = [
        {
            title: "Total Blogs",
            value: stats?.totalBlogs || 0,
            icon: <FileText size={28} className="text-[#6438C0]" />,
            color: "indigo",
        },
        {
            title: "Active Clients",
            value: stats?.totalClients || 0,
            icon: <Users size={28} className="text-[#6438C0]" />,
            color: "green",
        },
        {
            title: "Total Comments",
            value: stats?.totalComments || 0,
            icon: <MessageCircle size={28} className="text-[#6438C0]" />,
            color: "purple",
        },
        {
            title: "Contact Messages",
            value: stats?.totalContacts || 0,
            icon: <Mail size={28} className="text-[#6438C0]" />,
            color: "orange",
        },
    ];

    const pieData = [
        { name: "Published", value: stats?.publishedBlogs || 0 },
        { name: "Drafts", value: stats?.draftBlogs || 0 },
    ];

    const COLORS = ["#6438C0", "#f59e0b"];

    const formatNumber = (n) => {
        if (!n && n !== 0) return 0;
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600"/>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 py-12">Error fetching dashboard stats — {error}</div>
            ) : (
                <>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((card, i) => (
                            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-white p-5 rounded-xl shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-xs text-gray-500">{card.title}</h4>
                                        <p className="mt-2 text-2xl font-semibold text-gray-900">{formatNumber(card.value)}</p>
                                    </div>
                                    <div className="p-3 rounded-lg" style={{ background: 'rgba(99,102,241,0.06)' }}>
                                        {card.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Blogs Per Month</h3>
                                <div className="text-sm text-gray-500">Last 6 months</div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={charts?.blogsPerMonth || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e6f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip />
                                    <Bar dataKey="blogs" fill="#4f46e5" radius={[6,6,0,0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Blog Status</h3>
                                <div className="text-sm text-gray-500">Distribution</div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {pieData.map((entry, idx) => (
                                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Client Registrations</h3>
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={charts?.clientsPerWeek || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e6f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Comments This Week</h3>
                                <div className="text-sm text-gray-500">Last 7 days</div>
                            </div>
                            <ResponsiveContainer width="100%" height={240}>
                                <AreaChart data={charts?.commentsPerDay || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e6f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="comments" stroke="#8b5cf6" fill="#f3e8ff" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Weekly Contact Messages</h3>
                                <div className="text-sm text-gray-500">Last 7 days</div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={charts?.dailyVisitors || []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e6f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="visitors" stroke="#fb923c" fill="#fff7ed" />
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
