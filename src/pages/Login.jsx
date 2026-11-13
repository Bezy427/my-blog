import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import { login as loginUser } from "../services/api";
import {
    validateEmail,
    validatePassword,
} from "../utils/validation";
import Button from "../components/Button";
 
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [apiError, setApiError] = useState("");
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
            newErrors.email = "Email is required!";
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Enter a valid email address!";
        }

        if (!form.password) {
            newErrors.password = "Password is required!";
        } else if (!validatePassword(form.password)) {
            newErrors.password = 
                "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setApiError("");

        try {
            const data = await loginUser(form);

            login(data.token);

            navigate("/dashboard");
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[70vh] px-4 py-8 sm:py-12">
            <div className="mx-auto max-w-md rounded-xl border bg-white p-5 shadow-sm sm:p-8">
                <h1 className="text-3xl font-bold">
                    Welcome back
                </h1>

                <p className="mt-2 text-gray-600">
                    Sign in to your account.
                </p>

                {apiError && (
                    <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
                            placeholder="you@gmail.com"
                            error={errors.email}
                        />
{/* 
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )} */}
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
                            placeholder="........"
                            error={errors.password}
                        />

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="mx-auto block w-fit rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >   
                        {loading ? "Sigining in ..." : "Sign in"}    
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-black underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </main>
    )
}