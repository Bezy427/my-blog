
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import Input from "../components/Input";
import {
    validateEmail,
    validatePassword,
} from "../utils/validation";
import Button from "../components/Button";

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

    function handleChange(event) {
        const { name, value } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));

        setErrors(previous => ({
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
            newErrors.email = "Enter a valid email address.";
        }

        if (!form.password) {
            newErrors.password = "Password is required!";
        } else if (!validatePassword(form.password)) {
            newErrors.password =
                "Password must be at least 6 characters.";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
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
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                confirmPassword: form.confirmPassword,
            };

            console.log("Registration payload:", signupData);

            await signup(signupData);

            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error);
            setApiError(error.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[70vh] px-4 py-8 sm:py-12">
            <div className="mx-auto max-w-md rounded-xl border bg-white p-5 shadow-sm sm:p-8">

                <h1 className="text-3xl font-bold">
                    Create an account
                </h1>

                <p className="mt-2 text-gray-600">
                    Join TechBlog today.
                </p>

                {apiError && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {apiError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label htmlFor="username"
                            className="mb-2 block text-sm font-medium">
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
                    </div>

                    <div>
                        <label htmlFor="email"
                            className="mb-2 block text-sm font-medium">
                            Email
                        </label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="example@gmail.com"
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password"
                            className="mb-2 block text-sm font-medium">
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
                    </div>

                    <div>
                        <label htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium">
                            Confirm Password
                        </label>

                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="*********"
                            error={errors.confirmPassword}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="mx-auto block w-fit rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"
                        }
                    </Button>
                </form>

                <p className="mt-6 flex justify-center text-center text-sm text-gray-600">
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
    );
}
