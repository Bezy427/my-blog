import { useEffect, useState } from "react";
import { deletePost } from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function PostDetails() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "John",
            content: "Great article",
            createdAt: "Today",
        },
        {
            id: 2,
            author: "Sarah",
            content: "I learned something new from this.",
            createdAt: "Yesterday",
        },
    ]);

    useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(
                    `http://localhost:8080/posts/${id}`
                );

                if (!response.ok) {
                    throw new Error("Post not found!");
                }

                const data = await response.json();
                setPost(data);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    function handleAddComment(content) {
        const newComment = {
            id: Date.now(),
            author: "You",
            content,
            createdAt: "Just now",
        };

        setComments((previousComments) => [
            ...previousComments,
            newComment,
        ]);
    }

    async function handleDelete() {
        const confirmed = window.confirm(
                "Are you sure you want to delete this post?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePost(id);

            navigate("/posts");
        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) {
        return <p className="p-8 text-center">Loading post...</p>
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-600">
                    {error}
                </p>

                <Link 
                    to="/posts"
                    className="mt-4 inline-block underline"
                >
                        Back to posts
                    </Link>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <Link
                to="/posts"
                className="text-sm text-gray-500 hover:text-black"
            >
                Back to posts
            </Link>

            <article className="mt-8">
                <h1 className="text-4xl font-bold">
                    {post.title}
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                    By {post.author}
                </p>

                <div className="mt-8 leading-8 text-gray-700">
                    {post.content}
                </div>
            </article>

            <section className="mt-16 border-t pt-10">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">
                    Comments
                </h2>

                <CommentForm onAddComment={handleAddComment} />

                <CommentList comments={comments} />
            </section>
            {isAuthenticated && (
                <div className="mt-8 flex gap-3">
                    <Link
                        to={`/posts/${post.id}/edit`}
                        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            )}
        </main>
    );
}