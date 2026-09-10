import { Link } from "react-router-dom";
import Posts from "../pages/Posts";

export default function PostCard({ post }) {
    return (
        <article className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
                {post.title}
            </h2>

            <p className="mb-4 text-gray-600">
                {post.content}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    By {post.author}
                </span>  

                <Link 
                    to={`/posts/${post.id}`}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Read more
                </Link>
            </div>
        </article>
    );
}