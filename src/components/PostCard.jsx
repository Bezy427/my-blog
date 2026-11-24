
import { Link } from "react-router-dom";
import { formatDate } from "../utils/format";

function getAuthor(post) {
    if (typeof post.author === "object" && post.author !== null) {
        return post.author.username || post.author.name || "Anonymous";
    }

    return post.author || post.authorUsername || "Anonymous";
}

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function getReadingTime(content) {
    const words = content?.trim().split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 200));
}

export default function PostCard({ post }) {
    const author = getAuthor(post);
    const content = post.content || "";
    const image =
        post.coverImageUrl ||
        post.imageUrl ||
        post.thumbnailUrl ||
        post.image;

    const category = post.category || "Technology";
    const date = post.createdAt || post.publishedAt;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/70">

            {/* Article image */}
            <Link
                to={`/posts/${post.id}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                aria-label={`Read ${post.title}`}
            >
                {image ? (
                    <img
                        src={image}
                        alt={post.title || "Article cover"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-700">
                        <span className="text-6xl font-black text-white/20">
                            T
                        </span>
                    </div>
                )}

                <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/30 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        {category}
                    </span>
                </div>
            </Link>

            {/* Article content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {date && (
                        <>
                            <span>{formatDate(date)}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                        </>
                    )}

                    <span>{getReadingTime(content)} min read</span>
                </div>

                {/* Title */}
                <Link to={`/posts/${post.id}`}>
                    <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-indigo-600">
                        {post.title || "Untitled article"}
                    </h2>
                </Link>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                    {post.excerpt || content || "Discover this article on TechBlog."}
                </p>

                {/* Author and read link */}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 mt-6">

                    <div className="flex min-w-0 items-center gap-3">
                        {post.author?.avatarUrl ? (
                            <img
                                src={post.author.avatarUrl}
                                alt={author}
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                                {getInitials(author)}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {author}
                            </p>
                            <p className="text-xs text-slate-400">
                                Article author
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/posts/${post.id}`}
                        className="shrink-0 text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
                    >
                        Read article →
                    </Link>
                </div>
            </div>
        </article>
    );
}
