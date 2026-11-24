
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { login as loginUser } from "../services/api";
import {
    validateEmail,
    validatePassword,
} from "../utils/validation";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setApiError("");

        try {
            // Authenticate with the backend.
            const data = await loginUser(form);

            if (!data?.accessToken) {
                throw new Error(
                    "The server did not return an access token."
                );
            }

            // AuthContext stores the token and fetches the user.
            await login(data.accessToken);

            // Navigate only after authentication succeeds.
            navigate("/dashboard");
        } catch (error) {
            setApiError(
                error.message || "Unable to sign in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-2">

                {/* Left branding panel */}
                <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">
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
                            Your ideas matter
                        </span>

                        <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                            Welcome back to your
                            <span className="text-indigo-400">
                                {" "}creative space.
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-8 text-slate-400">
                            Discover fresh perspectives, share your knowledge,
                            and connect with a community that loves technology
                            and great ideas.
                        </p>

                        <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                            <div className="flex -space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-indigo-500 text-sm font-bold">
                                    T
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-500 text-sm font-bold">
                                    B
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-500 text-sm font-bold">
                                    C
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    A community of creators
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Read. Write. Share.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-slate-500">
                        © {new Date().getFullYear()} TechBlog. All rights reserved.
                    </p>
                </section>

                {/* Right login form */}
                <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-12 xl:px-16">
                    <div className="w-full max-w-md">

                        <Link
                            to="/"
                            className="mb-10 inline-flex items-center gap-2 lg:hidden"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-white">
                                T
                            </div>

                            <span className="text-xl font-bold text-slate-950">
                                Tech<span className="text-indigo-600">Blog.</span>
                            </span>
                        </Link>

                        <div className="mb-9">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                                Member access
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Welcome back
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Sign in to continue your journey with TechBlog.
                            </p>
                        </div>

                        {apiError && (
                            <div
                                role="alert"
                                className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                            >
                                <span className="font-bold">!</span>
                                <p>{apiError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    aria-invalid={Boolean(errors.email)}
                                    required
                                    placeholder="you@example.com"
                                    error={errors.email}
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        aria-invalid={Boolean(errors.password)}
                                        required
                                        placeholder="Enter your password"
                                        error={errors.password}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((previous) => !previous)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-indigo-600"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing you in..."
                                    : "Sign in to TechBlog"}
                            </Button>
                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />

                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                New to TechBlog?
                            </span>

                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <Link
                            to="/register"
                            className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            Create your account
                        </Link>

                        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
                            By signing in, you agree to use TechBlog responsibly
                            and respect the community.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 block text-center text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                        >
                            ← Back to homepage
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
