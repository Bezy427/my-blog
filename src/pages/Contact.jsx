
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

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
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!form.subject.trim()) {
            newErrors.subject = "Please enter a subject.";
        }

        if (form.message.trim().length < 10) {
            newErrors.message = "Message must contain at least 10 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Frontend validation only.
        // Connect this form to a backend endpoint to actually send messages.
        setSubmitted(true);
        setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    }

    return (
        <main className="min-h-screen bg-slate-50">

            {/* HERO */}
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-semibold text-indigo-300">
                            GET IN TOUCH
                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl">
                            Let's start a
                            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                conversation.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Have a question, suggestion or idea? We'd love
                            to hear from you. Get in touch and let's make
                            something meaningful happen.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-5 lg:px-8">

                {/* CONTACT INFORMATION */}
                <div className="lg:col-span-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                        Contact information
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-slate-950">
                        We'd love to hear from you.
                    </h2>

                    <p className="mt-5 leading-7 text-slate-500">
                        Whether you have feedback about TechBlog, need
                        assistance or simply want to connect, feel free
                        to reach out.
                    </p>

                    <div className="mt-10 space-y-6">

                        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                ✉️
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Email
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Have a question? Send us an email.
                                </p>
                                <a
                                    href="mailto:your-email@example.com"
                                    className="mt-2 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    your-email@example.com
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                💬
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Feedback
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    Your suggestions and ideas help make
                                    TechBlog better.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                🌐
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Explore TechBlog
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Discover articles and ideas from our community.
                                </p>
                                <Link
                                    to="/posts"
                                    className="mt-2 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    Browse articles →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTACT FORM */}
                <div className="lg:col-span-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

                        <h2 className="text-2xl font-black text-slate-950">
                            Send us a message
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Fill in the form below and tell us what's on your mind.
                        </p>

                        {submitted && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                                Your message passed validation. Message delivery
                                is not configured yet.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Your name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />

                                    {errors.name && (
                                        <p className="mt-2 text-xs text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />

                                {errors.subject && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Your message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />

                                {errors.message && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                            >
                                Send message →
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
