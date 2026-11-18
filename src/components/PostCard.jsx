import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <article className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {post.title}
            </h2>

            <p className="mt-3 line-clamp-4 text-sm leading-7 text-gray-600 sm:text-base">
                {post.content}
            </p>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500">
                    By {post.author}
                </span>

                <Link
                    to={`/posts/${post.id}`}
                    className="w-full rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
                >
                    Read more
                </Link>
            </div>
        </article>
    );
}