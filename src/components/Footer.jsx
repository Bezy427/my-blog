
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">

                {/* Main footer */}
                <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-600/20">
                                T
                            </div>

                            <span className="text-2xl font-black tracking-tight">
                                Tech<span className="text-indigo-400">Blog.</span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                            A space for ideas, technology, programming and
                            creativity. Learn something new, share your
                            knowledge and inspire others through your words.
                        </p>

                        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            Built for curious minds
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                            Explore
                        </h3>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/posts"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    All articles
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    About us
                                </Link>
                            </li>    
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                            Get involved
                        </h3>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link
                                    to="/register"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    Create an account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/login"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    Sign in
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/posts/create"
                                    className="text-slate-400 transition hover:text-indigo-400"
                                >
                                    Write an article
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} TechBlog. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <span>Think. Learn. Share.</span>

                        <button
                            type="button"
                            onClick={() => window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })}
                            className="font-semibold text-indigo-400 transition hover:text-indigo-300"
                        >
                            Back to top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
