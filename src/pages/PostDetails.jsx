import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        </main>
    );
}