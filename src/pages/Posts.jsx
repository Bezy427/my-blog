import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/api";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    if (loading) {
        return <p className="p-8 text-center">Loading posts...</p>
    }

    if (error) {
        return (
            <p className="p-8 text-center text-red-600">
                {error}
            </p>
        );
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="mb-8 text-3xl font-bold">Latest Posts</h1>

            <div className="space-y-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </main>
    );
}