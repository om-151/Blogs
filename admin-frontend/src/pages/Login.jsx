import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
        // Dummy auth (you can replace with real backend check)
        if (formData.email && formData.password) {
            setIsAuthenticated(true);
            navigate("/dashboard"); // redirect
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
