
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPost, updatePost } from "../services/api";

import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        let active = true;

        async function loadPost() {
            if (!id) {
                setError("Post ID is missing from the URL.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const post = await getPost(id);

                if (!active) return;

                if (!post) {
                    throw new Error("Post could not be found.");
                }

                setTitle(post.title || "");
                setContent(post.content || "");
            } catch (error) {
                if (active) {
                    setError(error.message || "Failed to load the article.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPost();

        return () => {
            active = false;
        };
    }, [id]);

    function validateForm() {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Article title is required.";
        } else if (title.trim().length < 5) {
            newErrors.title = "Title must contain at least 5 characters.";
        }

        if (!content.trim()) {
            newErrors.content = "Article content is required.";
        } else if (content.trim().length < 50) {
            newErrors.content = "Content must contain at least 50 characters.";
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!id || saving || !validateForm()) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            await updatePost(id, {
                title: title.trim(),
                content: content.trim(),
            });

            navigate(`/posts/${id}`);
        } catch (error) {
            console.error("Update post error:", error);

            setError(error.message || "Failed to update your article.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading article...
                    </p>
                </div>
            </main>
        );
    }

    if (error && !title && !content) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Unable to load article
                    </h1>

                    <p className="mt-3 text-sm text-red-600">
                        {error}
                    </p>

                    <Button
                        type="button"
                        onClick={() => navigate("/posts")}
                        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Back to articles
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-3xl">

                {/* Heading */}
                <div className="mb-8">
                    <button
                        type="button"
                        onClick={() => navigate(`/posts/${id}`)}
                        className="mb-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                        ← Back to article
                    </button>

                    <span className="mb-3 block text-sm font-bold uppercase tracking-wider text-indigo-600">
                        TechBlog Editor
                    </span>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Edit article
                    </h1>

                    <p className="mt-3 leading-7 text-slate-500">
                        Make changes to your article and save your updates.
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                    {error && (
                        <div
                            role="alert"
                            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-7">

                        <Input
                            label="Article title"
                            name="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter your article title"
                            error={validationErrors.title}
                            required
                            disabled={saving}
                        />

                        <div>
                            <Textarea
                                label="Article content"
                                name="content"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                placeholder="Write your article..."
                                error={validationErrors.content}
                                rows={14}
                                disabled={saving}
                            />

                            <p className="mt-2 text-right text-xs text-slate-400">
                                {content.length} characters
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                            <Button
                                type="button"
                                onClick={() => navigate(`/posts/${id}`)}
                                disabled={saving}
                                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving ? "Saving changes..." : "Save Changes"}
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
