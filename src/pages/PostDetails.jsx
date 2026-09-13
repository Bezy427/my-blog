import { useEffect, useState } from "react";
import { deletePost } from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

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

    async function loadPost() {
        setLoading(true);
        setError("");
        
        try {
            const data = await response.json();
            setPost(data);
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
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
        return <LoadingSpinner message="Loading post..." />;
    }

    if (error) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-10">
                <ErrorMessage
                    message={error}
                    onRetry={loadPost}
                />
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <Link
                to="/posts"
                className="text-sm text-gray-500 hover:text-black"
            >
                Back to posts
            </Link>

            <article className="rounded-cl border bg-white p-5">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    {post.title}
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                    By {post.author}
                </p>

                <div className="mt-6 whitespace-pre-line text-base leading-8 text-gray-700 sm:text-lg">
                    {post.content}
                </div>
            </article>

            <section className="mt-12 border-t pt-8 sm:mt-16 sm:pt-10">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">
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

                    <Button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            )}
        </main>
    );
}