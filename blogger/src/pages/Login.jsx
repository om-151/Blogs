import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import loginBG from "../assets/Login.jpg";

export default function Login({ setClientAuth }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Clear error while typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/clients/login",
                formData
            );

            const data = res.data;
            localStorage.setItem("clientToken", data.token);
            setClientAuth({ token: data.token, name: data.name });

            navigate("/blogs", { replace: true });
        } catch (err) {
            setErrors({
                general: err.response?.data?.message || "Invalid credentials",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div
                className="hidden md:flex w-1/2 relative items-center justify-center p-10 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${loginBG})`,
                }}
            >
            </div>

            {/* Right Side */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                                />
                                <span
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <p className="text-red-500 text-sm text-center">
                                {errors.general}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg cursor-pointer font-semibold text-white transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#6438C0] hover:bg-indigo-800"
                                }`}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6 text-sm">
                        Don’t have an account?{" "}
                        <span
                            className="text-indigo-600 font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}