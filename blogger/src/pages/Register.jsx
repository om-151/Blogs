import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import registerBG from "../assets/Signup.jpg";

export default function Register({ setClientAuth }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

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

        // Confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/clients/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }
            );

            const data = res.data;
            localStorage.setItem("clientToken", data.token);
            setClientAuth({ token: data.token, name: data.name });

            navigate("/blogs", { replace: true });
        } catch (err) {
            setErrors({
                general:
                    err.response?.data?.message || "Registration failed",
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
                    backgroundImage:
                        `url(${registerBG})`,
                }}
            >
            </div>

            {/* Right Side */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Full Name
                            </label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } focus:ring-2 focus:ring-indigo-500 outline-none`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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
                                    placeholder="Enter password"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } focus:ring-2 focus:ring-indigo-500 outline-none`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {errors.general && (
                            <p className="text-red-500 text-sm text-center">
                                {errors.general}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg cursor-pointer font-semibold text-white transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#6438C0] hover:bg-indigo-800"
                                }`}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6 text-sm">
                        Already have an account?{" "}
                        <span
                            className="text-indigo-600 font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}