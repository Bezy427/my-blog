
import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";

export default function PostForm({
    onAddPost,
    submitting = false,
}) {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [errors, setErrors] = useState({});

    const maxTitleLength = 120;
    const maxExcerptLength = 300;

    function validateForm() {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Post title is required.";
        }

        if (title.trim().length < 5) {
            newErrors.title = "Title must contain at least 5 characters.";
        }

        if (!excerpt.trim()) {
            newErrors.excerpt = "Post excerpt is required.";
        }

        if (excerpt.trim().length < 20) {
            newErrors.excerpt = "Excerpt must contain at least 20 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (submitting || !validateForm()) {
            return;
        }

        const newPost = {
            title: title.trim(),
            excerpt: excerpt.trim(),
        };

        try {
            await onAddPost(newPost);

            setTitle("");
            setExcerpt("");
            setErrors({});
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Create a new post
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Share something interesting with the TechBlog community.
                </p>
            </div>

            <div>
                <Input
                    label="Post title"
                    name="title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value.slice(0, maxTitleLength))
                    }
                    placeholder="Enter an engaging post title"
                    error={errors.title}
                    required
                    disabled={submitting}
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                    {title.length}/{maxTitleLength}
                </p>
            </div>

            <div>
                <Textarea
                    label="Post excerpt"
                    name="excerpt"
                    value={excerpt}
                    onChange={(event) =>
                        setExcerpt(event.target.value.slice(0, maxExcerptLength))
                    }
                    placeholder="Write a short introduction to your article..."
                    error={errors.excerpt}
                    rows={5}
                    disabled={submitting}
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                    {excerpt.length}/{maxExcerptLength}
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Publishing...
                        </>
                    ) : (
                        "Publish Post"
                    )}
                </button>
            </div>
        </form>
    );
}
