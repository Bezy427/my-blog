
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../services/api";

import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("DRAFT");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    function validateForm() {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "A post title is required.";
        } else if (title.trim().length < 5) {
            newErrors.title = "Title must contain at least 5 characters.";
        }

        if (!content.trim()) {
            newErrors.content = "Post content is required.";
        } else if (content.trim().length < 50) {
            newErrors.content = "Content must contain at least 50 characters.";
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (loading || !validateForm()) {
            return;
        }

        setLoading(true);
        setErrors("");

        try {
            const post = await createPost({
                title: title.trim(),
                content: content.trim(),
                status,
            });

            console.log("Created post:", post);

            navigate("/posts");
        } catch (error) {
            console.error("Create post error:", error);
            setErrors(error.message || "Something went wrong while creating your post.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-3xl">

                {/* Page heading */}
                <div className="mb-8">
                    <button
                        type="button"
                        onClick={() => navigate("/posts")}
                        className="mb-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                        ← Back to articles
                    </button>

                    <span className="mb-3 block text-sm font-bold uppercase tracking-wider text-indigo-600">
                        TechBlog Editor
                    </span>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Create an article
                    </h1>

                    <p className="mt-3 leading-7 text-slate-500">
                        Share your knowledge, ideas, and experiences with
                        the TechBlog community.
                    </p>
                </div>

                {/* Editor */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                    {errors && (
                        <div
                            role="alert"
                            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                        >
                            {errors}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Title */}
                        <Input
                            label="Article title"
                            name="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Give your article a compelling title..."
                            error={validationErrors.title}
                            required
                            disabled={loading}
                        />

                        {/* Content */}
                        <div>
                            <Textarea
                                label="Article content"
                                name="content"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                placeholder="Start writing your article here..."
                                error={validationErrors.content}
                                rows={14}
                                disabled={loading}
                            />

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                                <span>Minimum 50 characters</span>
                                <span>{content.length} characters</span>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Publication status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60"
                            >
                                <option value="DRAFT">Save as draft</option>
                                <option value="PUBLISHED">Publish immediately</option>
                            </select>

                            <p className="mt-2 text-xs text-slate-400">
                                Drafts are not publicly published. Published articles
                                may be visible to readers.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                            <Button
                                type="button"
                                onClick={() => navigate("/posts")}
                                disabled={loading}
                                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Saving article..." : "Create article"}
                            </Button>

                        </div>
                    </form>
                </div>

                <p className="mt-5 text-center text-xs text-slate-400">
                    Write something meaningful. Your ideas deserve to be shared.
                </p>
            </div>
        </main>
    );
}
