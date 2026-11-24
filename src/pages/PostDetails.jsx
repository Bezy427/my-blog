
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getPost, deletePost } from "../services/api";
import { useAuth } from "../context/AuthContext";

import ErrorMessage from "../components/ErrorMessage";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

import { formatDate } from "../utils/format";

function getAuthorName(author) {
    if (!author) return "Anonymous";

    if (typeof author === "string") {
        return author;
    }

    return (
        author.username ||
        author.name ||
        author.email ||
        "Anonymous"
    );
}

function getAuthorId(post) {
    if (post.author && typeof post.author === "object") {
        return post.author.id ?? post.author.userId;
    }

    return post.authorId ?? post.userId;
}

function getReadingTime(content = "") {
    const words = content.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
}

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    // Load article.
    const loadPost = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getPost(id);

            setPost(data);

            // Temporary until the comments API is implemented.
            setComments([]);
        } catch (err) {
            setError(
                err.message || "Unable to load this article."
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    // Add a temporary local comment.
    function handleAddComment(content) {
        const newComment = {
            id: crypto.randomUUID(),
            author: user?.username || user?.name || "You",
            content,
            createdAt: new Date().toISOString(),
        };

        setComments((previous) => [
            ...previous,
            newComment,
        ]);
    }

    // Delete article.
    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this article?"
        );

        if (!confirmed) return;

        setDeleting(true);
        setError("");

        try {
            await deletePost(id);

            navigate("/posts", {
                replace: true,
                state: {
                    message: "Article deleted successfully.",
                },
            });
        } catch (err) {
            setError(
                err.message || "Failed to delete this article."
            );

            setDeleting(false);
        }
    }

    // Loading state.
    if (loading) {
        return <LoadingSpinner message="Loading article..." />;
    }

    // Error state.
    if (error && !post) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-12">
                <ErrorMessage
                    message={error}
                    onRetry={loadPost}
                />

                <Link
                    to="/posts"
                    className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                    ← Back to articles
                </Link>
            </main>
        );
    }

    // Missing article.
    if (!post) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-12">
                <p className="text-slate-600">
                    Article not found.
                </p>

                <Link
                    to="/posts"
                    className="mt-4 inline-block text-indigo-600"
                >
                    Back to articles
                </Link>
            </main>
        );
    }

    const authorName = getAuthorName(post.author);

    const content = post.content || "";

    const postDate = post.createdAt || post.publishedAt;

    const authorId = getAuthorId(post);

    const isOwner =
        user?.id != null &&
        authorId != null &&
        String(user.id) === String(authorId);

    const canManagePost = isAuthenticated && isOwner;

    const coverImage =
        post.coverImageUrl ||
        post.imageUrl ||
        post.thumbnailUrl;

    const avatarUrl =
        typeof post.author === "object"
            ? post.author?.avatarUrl
            : null;

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Navigation */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        to="/posts"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
                    >
                        <span>←</span>
                        Back to articles
                    </Link>

                    <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                        {post.category || "Technology"}
                    </span>
                </div>

                {/* Article */}
                <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    {/* Cover image */}
                    {coverImage && (
                        <div className="aspect-[16/7] overflow-hidden bg-slate-100">
                            <img
                                src={coverImage}
                                alt={post.title || "Article cover"}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
                        <div className="mx-auto max-w-3xl">

                            {/* Article metadata */}
                            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                {postDate && (
                                    <>
                                        <time dateTime={postDate}>
                                            {formatDate(postDate)}
                                        </time>

                                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                                    </>
                                )}

                                <span>
                                    {getReadingTime(content)} min read
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                {post.title || "Untitled article"}
                            </h1>

                            {/* Author */}
                            <div className="mt-8 flex items-center gap-4 border-b border-slate-100 pb-8">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={authorName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                                        {authorName.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div>
                                    <p className="font-bold text-slate-900">
                                        {authorName}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Article author
                                    </p>
                                </div>
                            </div>

                            {/* Article content */}
                            <div className="prose prose-slate mt-10 max-w-none whitespace-pre-line text-base leading-8 sm:text-lg">
                                {content}
                            </div>

                            {/* Article management */}
                            {canManagePost && (
                                <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-100 pt-8">
                                    <Link
                                        to={`/posts/${post.id}/edit`}
                                        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                                    >
                                        Edit article
                                    </Link>

                                    <Button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                    >
                                        {deleting
                                            ? "Deleting..."
                                            : "Delete article"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                {/* Delete error */}
                {error && (
                    <div className="mt-6">
                        <ErrorMessage message={error} />
                    </div>
                )}

                {/* Comments */}
                <section className="mx-auto mt-12 max-w-3xl sm:mt-16">

                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Community
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-slate-950">
                            Discussion
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Share your thoughts about this article.
                        </p>
                    </div>

                    {/* Comment form */}
                    {isAuthenticated ? (
                        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <h3 className="mb-4 font-bold text-slate-900">
                                Leave a comment
                            </h3>

                            <CommentForm
                                onAddComment={handleAddComment}
                            />
                        </div>
                    ) : (
                        <div className="mb-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
                            <h3 className="font-bold text-slate-900">
                                Join the conversation
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                Sign in to share your thoughts on this article.
                            </p>

                            <Link
                                to="/login"
                                className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                            >
                                Sign in
                            </Link>
                        </div>
                    )}

                    {/* Comment list */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                        <h3 className="mb-6 text-lg font-bold text-slate-900">
                            Comments ({comments.length})
                        </h3>

                        <CommentList comments={comments} />
                    </div>
                </section>
            </div>
        </main>
    );
}
