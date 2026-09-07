import { useState } from "react";

export default function PostForm({ onAddPost }) {
    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            title,
            excerpt,
            date: new Date().toLocaleDateString(),
            image: "https://picsum.photos/400/203"
        }
        onAddPost(newPost)
        setTitle('')
        setExcerpt('')
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">Create New Post</h2>

            <input 
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-gray-900 text-blue-500 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                required 
            />

            <textarea 
                placeholder="Post Excerpt" 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)} 
                className="w-full border-gray-900 text-blue-500 rounded-lg p-3 mb-4 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Publish Post
            </button>
        </form>
    )
}