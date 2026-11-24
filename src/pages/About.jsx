
import { Link } from "react-router-dom";

const technologies = [
    {
        name: "Java",
        category: "Backend language",
        description: "Core language powering the application backend.",
        icon: "☕",
    },
    {
        name: "Spring Boot",
        category: "Backend framework",
        description: "Building robust RESTful APIs and backend services.",
        icon: "🍃",
    },
    {
        name: "Spring Security",
        category: "Authentication",
        description: "Protecting endpoints and securing user accounts.",
        icon: "🔐",
    },
    {
        name: "JWT",
        category: "Authorization",
        description: "Token-based authentication for protected resources.",
        icon: "🔑",
    },
    {
        name: "MySQL",
        category: "Database",
        description: "Relational database for persistent application data.",
        icon: "🗄️",
    },
    {
        name: "React",
        category: "Frontend library",
        description: "Creating a responsive and interactive user interface.",
        icon: "⚛️",
    },
    {
        name: "React Router",
        category: "Navigation",
        description: "Managing client-side navigation and application routes.",
        icon: "🧭",
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        description: "Building a modern and responsive visual experience.",
        icon: "🎨",
    },
];

const features = [
    {
        number: "01",
        title: "User authentication",
        description:
            "Secure registration and login with JWT-based authentication.",
    },
    {
        number: "02",
        title: "Article management",
        description:
            "Create, read, update and delete blog posts through REST APIs.",
    },
    {
        number: "03",
        title: "Protected resources",
        description:
            "Authentication and authorization for protected application endpoints.",
    },
    {
        number: "04",
        title: "Responsive interface",
        description:
            "A clean experience designed for desktop, tablet and mobile devices.",
    },
];

export default function About() {
    return (
        <main className="min-h-screen bg-slate-50">

            {/* HERO */}
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-semibold text-indigo-300">
                            ABOUT THE PROJECT
                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                            More than just
                            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                a blogging platform.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                            TechBlog is a full-stack blogging application
                            built to demonstrate modern backend engineering,
                            secure API development and interactive frontend
                            experiences.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/posts"
                                className="rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-indigo-500"
                            >
                                Explore articles →
                            </Link>

                            <Link
                                to="/"
                                className="rounded-xl border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Back home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT OVERVIEW */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            The vision
                        </p>

                        <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                            Built with modern technologies and practical
                            engineering principles.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            The project brings together a Java Spring Boot
                            backend and a React frontend to create a complete
                            blogging experience. It demonstrates how
                            frontend applications communicate with RESTful
                            services while maintaining secure access to
                            protected resources.
                        </p>

                        <p className="mt-5 leading-8 text-slate-600">
                            From authentication and database persistence to
                            article management and responsive design, TechBlog
                            brings together several important concepts in
                            full-stack software development.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-6">
                            <span className="text-sm font-bold tracking-widest text-indigo-400">
                                PROJECT OVERVIEW
                            </span>
                            <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-400">
                                Full Stack
                            </span>
                        </div>

                        <div className="mt-8 space-y-7">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Backend
                                </p>
                                <p className="mt-2 text-xl font-bold">
                                    Java + Spring Boot
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Frontend
                                </p>
                                <p className="mt-2 text-xl font-bold">
                                    React + Tailwind CSS
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Database
                                </p>
                                <p className="mt-2 text-xl font-bold">
                                    MySQL
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Security
                                </p>
                                <p className="mt-2 text-xl font-bold">
                                    Spring Security + JWT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="border-y border-slate-200 bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            What it offers
                        </p>

                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                            Designed around essential features.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            The application combines the core functionality
                            expected from a modern blogging platform.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature.number}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                            >
                                <span className="text-sm font-black text-indigo-600">
                                    {feature.number}
                                </span>

                                <h3 className="mt-5 text-xl font-bold text-slate-950">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECHNOLOGY STACK */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                        Under the hood
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                        Technology stack
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
                        Technologies used to build the frontend, backend,
                        database and security layers of TechBlog.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {technologies.map((technology) => (
                        <div
                            key={technology.name}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-100">
                                {technology.icon}
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-950">
                                {technology.name}
                            </h3>

                            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
                                {technology.category}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {technology.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 px-7 py-16 text-center text-white sm:px-12">
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative">
                        <h2 className="text-3xl font-black sm:text-4xl">
                            Ready to explore TechBlog?
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl leading-7 text-indigo-100">
                            Discover articles, share ideas and become part
                            of the community.
                        </p>

                        <Link
                            to="/posts"
                            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition hover:-translate-y-1 hover:bg-indigo-50"
                        >
                            Explore articles →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
