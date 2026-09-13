import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadPosts() {
        setLoading(true);
        setError("");

        try {
            const data = await getPosts();
            setPosts(data);
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);

    if (loading) {
        return <LoadingSpinner message="Loading posts..." />
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
                onRetry={loadPosts}
            />
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Posts</h1>

                    <p className="mt-2 text-gray-600">
                        Read the latest posts 
                    </p>
                </div>

                <Link
                    to="/posts/create"
                    className="rounded-lg bg-black px-5 py-3 text-center text-sm font-medium text-white hover:bg-gray-800"
                >
                    Create Posts
                </Link>
            </div>

            {posts.length === 0 ? (
                <EmptyState
                    title="No posts yet"
                    message = "Be the first to create a blog post."
                />   
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {posts.map((post) =>(
                        <PostCard 
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}