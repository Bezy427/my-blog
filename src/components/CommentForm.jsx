
import { useState } from "react";

export default function CommentForm({
    onAddComment,
    disabled = false,
}) {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const maxLength = 1000;
    const remainingCharacters = maxLength - content.length;

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedContent = content.trim();

        if (!trimmedContent || disabled || submitting) {
            return;
        }

        try {
            setSubmitting(true);

            await onAddComment(trimmedContent);

            setContent("");
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="comment"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Your comment
                </label>

                <textarea
                    id="comment"
                    name="comment"
                    value={content}
                    onChange={(event) =>
                        setContent(event.target.value.slice(0, maxLength))
                    }
                    rows={5}
                    maxLength={maxLength}
                    disabled={disabled || submitting}
                    required
                    placeholder="Share your thoughts about this article..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                        Keep your feedback respectful and constructive.
                    </p>

                    <span
                        className={`text-xs font-medium ${
                            remainingCharacters < 100
                                ? "text-amber-600"
                                : "text-slate-400"
                        }`}
                    >
                        {content.length}/{maxLength}
                    </span>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={
                        disabled ||
                        submitting ||
                        !content.trim()
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Posting...
                        </>
                    ) : (
                        "Post Comment"
                    )}
                </button>
            </div>
        </form>
    );
}
