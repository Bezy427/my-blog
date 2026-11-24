
import EmptyState from "./EmptyState";
import { formatDate } from "../utils/format";

export default function CommentList({ comments = [] }) {
    if (!comments || comments.length === 0) {
        return (
            <EmptyState
                title="No comments yet."
                message="Be the first to share your thoughts."
            />
        );
    }

    return (
        <div className="space-y-5">
            {comments.map((comment) => {
                const author =
                    typeof comment.author === "object"
                        ? comment.author?.username ||
                          comment.author?.name ||
                          "Anonymous"
                        : comment.author || "Anonymous";

                const initials = author
                    .split(" ")
                    .filter(Boolean)
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                return (
                    <article
                        key={comment.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                    >
                        <div className="flex items-start gap-4">
                            {/* Author avatar */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                                {initials || "A"}
                            </div>

                            <div className="min-w-0 flex-1">
                                {/* Author details */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="font-bold text-slate-900">
                                        {author}
                                    </h3>

                                    <time
                                        dateTime={comment.createdAt}
                                        className="text-xs font-medium text-slate-400"
                                    >
                                        {formatDate(comment.createdAt)}
                                    </time>
                                </div>

                                {/* Comment content */}
                                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
