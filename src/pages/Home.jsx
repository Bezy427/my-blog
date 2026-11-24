
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPosts();

                const articles = Array.isArray(data)
                    ? data
                    : data?.content || [];

                setPosts(articles);
            } catch (err) {
                setError(err.message || "Unable to load articles.");
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    const featuredPosts = posts.slice(0, 3);

    return (
        <main className="min-h-screen bg-white">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-slate-950 text-white">

                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:px-8">

                    <div>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-200">
                            <span className="h-2 w-2 rounded-full bg-indigo-400" />
                            Ideas worth sharing
                        </div>

                        <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                            Think.
                            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Learn.
                            </span>
                            <span className="block">Share.</span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                            Welcome to TechBlog — a place for ideas, technology,
                            tutorials and experiences. Explore new perspectives
                            and learn something worth sharing.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/posts"
                                className="rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:-translate-y-1 hover:bg-indigo-500"
                            >
                                Explore articles →
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Join the community
                            </Link>
                        </div>

                        <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-3xl font-black">
                                    {posts.length}+
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Articles
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-black">100%</p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Curiosity
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-black">∞</p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Ideas
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HERO VISUAL */}
                    <div className="relative hidden lg:block">
                        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl" />

                        <div className="relative rotate-2 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                    <div className="h-3 w-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-medium tracking-widest text-slate-400">
                                    TECHBLOG / JOURNAL
                                </span>
                            </div>

                            <div className="py-10">
                                <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                                    Discover something new
                                </p>

                                <h2 className="mt-5 text-4xl font-black leading-tight">
                                    Knowledge is
                                    <span className="block text-indigo-400">
                                        meant to be shared.
                                    </span>
                                </h2>

                                <p className="mt-5 leading-7 text-slate-400">
                                    Read ideas, explore technology and discover
                                    perspectives that inspire your next big idea.
                                </p>

                                <div className="mt-10 space-y-4">
                                    {[
                                        ["01", "Technology & Innovation"],
                                        ["02", "Programming & Development"],
                                        ["03", "Ideas & Experiences"],
                                    ].map(([number, title]) => (
                                        <div
                                            key={number}
                                            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                                        >
                                            <span className="font-black text-indigo-400">
                                                {number}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-200">
                                                {title}
                                            </span>
                                            <span className="ml-auto text-slate-500">
                                                ↗
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED ARTICLES */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            The latest
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Explore our articles
                        </h2>

                        <p className="mt-3 max-w-xl leading-7 text-slate-500">
                            Fresh ideas, useful tutorials and interesting
                            perspectives from our community.
                        </p>
                    </div>

                    <Link
                        to="/posts"
                        className="font-bold text-indigo-600 transition hover:text-indigo-800"
                    >
                        View all articles →
                    </Link>
                </div>

                {loading ? (
                    <LoadingSpinner message="Discovering articles..." />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : featuredPosts.length > 0 ? (
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {featuredPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                        <div className="text-4xl">✍️</div>
                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            No articles yet
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Be the first to publish something interesting.
                        </p>
                        <Link
                            to="/posts/create"
                            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
                        >
                            Write an article
                        </Link>
                    </div>
                )}
            </section>

            {/* CALL TO ACTION */}
            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 px-7 py-16 text-center text-white sm:px-12">
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative">
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">
                            Your voice matters
                        </p>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-5xl">
                            Have an idea worth sharing?
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl leading-7 text-indigo-100">
                            Create an account, publish your thoughts and
                            become part of the TechBlog community.
                        </p>

                        <Link
                            to="/register"
                            className="mt-9 inline-block rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:bg-indigo-50"
                        >
                            Start writing today →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
