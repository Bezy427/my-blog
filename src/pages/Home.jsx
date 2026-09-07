import { useState } from "react"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"

export default function Home() {
    const [posts, setPosts]  = useState([
        { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of components...", date: "Sept 4, 2026", image: "https://picsum.photos/400/200" },
        { id: 2, title: "Tailwind CSS Tips", excerpt: "How to build faster UIs...", date: "Sept 3, 2026", image: "https://picsum.photos/400/201" },
        { id: 3, title: "Spring Boot + React", excerpt: "Connect your frontend to backend...", date: "Sept 2, 2026", iamge: "https://picsum.photos/400/202" },
    ])

    const addPost = (newPost) => {
        setPosts([newPost, ...posts])
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div>
                <h1 className="flex justify-between items-center text-5xl text-blue-400 font-bold px-10 py-15">Welcome to my Blog</h1>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-4xl text-blue-400 font-bold mb-8">Latest Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => <PostCard key={post.id} {...post} />)}
                </div>
            </div>
        </div>
    )
}