import EmptyState from "./EmptyState";

export default function CommentList({ comments }) {
    if (comments.length === 0) {
        return (
            <EmptyState 
                title="No comments yet."
                message="Be the first to share your thoughts."
            />
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <article
                    key={comment.id}
                    className="rounded-xl border bg-white p-5"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                            {comment.author}
                        </h3>

                        <span className="text-sm text-gray-500">
                            {comment.createdAt}
                        </span>
                    </div>

                    <p className="mt-3 leading-7 text-gray-700">
                        {comment.content}
                    </p>
                </article>
            ))}
        </div>
    )
}