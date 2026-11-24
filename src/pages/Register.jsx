
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
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
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            newErrors.username = "Username is required.";
        } else if (form.username.trim().length < 3) {
            newErrors.username = "Username must have at least 3 characters.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!form.password) {
            newErrors.password = "Password is required.";
        } else if (!validatePassword(form.password)) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!form.confirmPassword) {
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

        if (!validateForm()) return;

        setLoading(true);

        try {
            const signupData = {
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                confirmPassword: form.confirmPassword,
            };

            await signup(signupData);

            navigate("/login", {
                state: {
                    message: "Your account was created successfully. Please sign in.",
                },
            });
        } catch (error) {
            setApiError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-2">

                {/* Branding panel */}
                <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border-[40px] border-indigo-400" />
                        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full border-[50px] border-blue-500" />
                    </div>

                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-slate-950">
                                T
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Tech<span className="text-indigo-400">Blog.</span>
                            </span>
                        </Link>
                    </div>

                    <div className="relative z-10 max-w-md">
                        <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                            Join the community
                        </span>

                        <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                            Your voice deserves
                            <span className="text-indigo-400"> to be heard.</span>
                        </h2>

                        <p className="mt-6 text-base leading-8 text-slate-400">
                            Create your account and become part of a community
                            where ideas grow, knowledge is shared, and creativity
                            has no limits.
                        </p>

                        <div className="mt-10 space-y-6">
                            {[
                                {
                                    number: "01",
                                    title: "Share your knowledge",
                                    description: "Publish articles and express your ideas.",
                                },
                                {
                                    number: "02",
                                    title: "Discover new perspectives",
                                    description: "Explore articles from other creators.",
                                },
                                {
                                    number: "03",
                                    title: "Build your presence",
                                    description: "Create a profile and grow your audience.",
                                },
                            ].map((item) => (
                                <div key={item.number} className="flex gap-4">
                                    <span className="text-sm font-bold text-indigo-400">
                                        {item.number}
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-slate-500">
                        © {new Date().getFullYear()} TechBlog. All rights reserved.
                    </p>
                </section>

                {/* Registration form */}
                <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-12 xl:px-16">

                    <div className="w-full max-w-md">

                        <Link to="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-white">
                                T
                            </div>
                            <span className="text-xl font-bold text-slate-950">
                                Tech<span className="text-indigo-600">Blog.</span>
                            </span>
                        </Link>

                        <div className="mb-8">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                                Get started
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Create your account
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Join TechBlog and start sharing your ideas today.
                            </p>
                        </div>

                        {apiError && (
                            <div
                                role="alert"
                                className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                            >
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Username
                                </label>

                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Choose a username"
                                    aria-invalid={Boolean(errors.username)}
                                    error={errors.username}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Email address
                                </label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    error={errors.email}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Create a password"
                                        aria-invalid={Boolean(errors.password)}
                                        error={errors.password}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((previous) => !previous)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-indigo-600"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your password again"
                                        aria-invalid={Boolean(errors.confirmPassword)}
                                        error={errors.confirmPassword}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((previous) => !previous)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-indigo-600"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating your account..." : "Create account"}
                            </Button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                Already a member?
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <Link
                            to="/login"
                            className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            Sign in to your account
                        </Link>

                        <p className="mt-7 text-center text-xs leading-6 text-slate-400">
                            By creating an account, you agree to use TechBlog
                            responsibly and respect the community.
                        </p>

                        <Link
                            to="/"
                            className="mt-5 block text-center text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                        >
                            ← Back to homepage
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
