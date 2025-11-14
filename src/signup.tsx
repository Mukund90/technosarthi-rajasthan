import { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert(`Account created for: ${formData.username}`);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-xl w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-semibold">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
