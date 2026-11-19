
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../services/api";
import Button from "../components/Button";

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("DRAFT");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setErrors("");

        try {
            const post = await createPost({
                title,
                content,
                status,
            });

            console.log("Created post:", post);

            navigate("/posts");
        } catch (error) {
            console.error("Create post error:", error);
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Create Post
                </h1>

                {errors && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
                        {errors}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block font-medium"
                        >
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                            placeholder="Enter your post title"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="content"
                            className="mb-2 block font-medium"
                        >
                            Content
                        </label>

                        <textarea
                            id="content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                            rows={10}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                            placeholder="Write your post..."
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="mb-2 block font-medium"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            required
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Post"}
                    </Button>
                </form>
            </div>
        </main>
    );
}
