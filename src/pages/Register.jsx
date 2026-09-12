import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import Input from "../components/Input";
import {
    validateEmail,
    validatePassword,
} from "../utils/validation";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [apiError, setApiError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));

        setApiError("");
    }

    function validateForm() {
        const newErrors = {};

        if (!form.username.trim()) {
            newErrors.username = "Username is required!";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Enter a valid email address."
        }

        if (!form.password) {
            newErrors.password = "Password is reqiured!";
        } else if (!validatePassword(form.password)) {
            newErrors.password = 
                "Password must be at least 6 characters.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setApiError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const signupData = {
                username: form.username,
                email: form.email,
                password: form.password,
            };

            await signup(signupData);

            navigate("/login");
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold">
                    Create an account
                </h1>

                <p className="mt-2 text-gray-600">
                    Join TechBlog today.
                </p>

                {apiError && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form 
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label 
                            htmlFor="username" 
                            className="mb-2 block text-sm font-medium"
                        >
                            Username
                        </label>

                        <Input 
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            placeholder="Tinotenda"
                            error={errors.username}
                        />

                        {errors.username && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            Email
                        </label>

                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                            required
                            placeholder="example@gmail.com"
                            error={errors.email}
                        />

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    
                    <div>
                        <label 
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium"
                        >
                            Password
                        </label>

                        <Input 
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="*********"
                            error={errors.password}
                        />

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="confirmPassword" 
                            className="mb-2 block text-sm font-medium"
                        >
                            Confirm Password
                        </label>

                        <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="*********"
                            error={errors.confirmPassword}
                        />

                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading 
                            ? "Creating account..." 
                            : "Create account"
                        }
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-black underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    )
}