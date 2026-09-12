import { useState } from "react";

export default function CommentForm({ onAddComment }) {
    const [content, setContent] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!content.trim()) {
            return;
        }

        onAddComment(content);

        setContent("");
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <label 
                htmlFor="comment" 
                className="mb-2 block text-sm font-medium text-gray-900"
            >
                Leave a comment
            </label>

            <textarea 
                id="comment"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows="4"
                placeholder="write your thoughts..."
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
            />

            <button
                type="submit"
                className="mt-3 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
                Post Comment
            </button>
        </form>
    )
}