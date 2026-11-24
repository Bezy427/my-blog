
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const loadPosts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getPosts();
            setPosts(Array.isArray(data) ? data : data?.content || []);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load articles."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const filteredPosts = posts.filter((post) => {
        const query = search.toLowerCase();

        return (
            post.title?.toLowerCase().includes(query) ||
            post.content?.toLowerCase().includes(query) ||
            post.author?.username?.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero section */}
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

                <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                            <span className="h-2 w-2 rounded-full bg-indigo-400" />
                            The TechBlog Journal
                        </span>

                        <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Ideas worth
                            <span className="text-indigo-400"> reading.</span>
                            <br />
                            Stories worth sharing.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                            Explore insightful articles, discover fresh
                            perspectives, and learn from a community of
                            passionate writers and technology enthusiasts.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <a
                                href="#articles"
                                className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-indigo-100"
                            >
                                Explore articles
                            </a>

                            <Link
                                to="/posts/create"
                                className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Write an article →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-10 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-3xl font-bold">
                                {posts.length}
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                Published articles
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold">∞</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Ideas to discover
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold">01</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Community of creators
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles section */}
            <section
                id="articles"
                className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16"
            >
                <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Discover
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                            Latest articles
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Explore ideas and insights from our writers.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <div className="relative w-full sm:w-72">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                ⌕
                            </span>

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search articles..."
                                aria-label="Search articles"
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={loadPosts}
                            disabled={loading}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50"
                        >
                            ↻ Refresh
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-900">
                            {filteredPosts.length}
                        </span>{" "}
                        {filteredPosts.length === 1 ? "article" : "articles"}
                    </p>
                </div>

                <div className="mt-8">
                    {loading ? (
                        <LoadingSpinner message="Discovering articles..." />
                    ) : error ? (
                        <ErrorMessage
                            message={error}
                            onRetry={loadPosts}
                        />
                    ) : filteredPosts.length === 0 ? (
                        search ? (
                            <EmptyState
                                title="No matching articles"
                                message="Try another search term."
                            />
                        ) : (
                            <EmptyState
                                title="No articles published yet"
                                message="Be the first to share an idea with the TechBlog community."
                            />
                        )
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom call to action */}
                <div className="mt-16 overflow-hidden rounded-3xl bg-indigo-600 px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold">
                            Have something worth sharing?
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-indigo-100">
                            Turn your knowledge and experiences into an article.
                            Your next great idea could inspire someone.
                        </p>
                    </div>

                    <Link
                        to="/posts/create"
                        className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50 lg:mt-0"
                    >
                        Start writing →
                    </Link>
                </div>
            </section>
        </main>
    );
}
