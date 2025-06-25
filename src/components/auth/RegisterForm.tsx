"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        console.log("Registering with:", { name, email, password, mobile });
        // TODO: Replace with backend registration logic
    };

    const handleGoogleRegister = () => {
        console.log("Google registration");
        // TODO: Implement Google auth via NextAuth
    };

    return (
        <form
            onSubmit={handleRegister}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-emerald-700 text-center">
                Register for Paaydal Trekkers
            </h2>

            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-emerald-600"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-emerald-600"
            />

            <input
                type="tel"
                placeholder="Mobile (optional)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-emerald-600"
            />

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-emerald-600"
                />
                <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-emerald-600"
            />

            <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500 font-medium transition"
            >
                Register
            </button>

            <div className="text-center text-sm text-gray-600">or</div>

            <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
                <FcGoogle size={20} />
                Sign up with Google
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <a
                    href="/login"
                    className="text-emerald-700 font-medium hover:underline"
                >
                    Login
                </a>
            </p>
        </form>
    );
}
