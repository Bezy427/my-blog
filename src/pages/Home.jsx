import { useState } from "react"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"

export default function Home() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="text-4xl font-bold">
                Welcome to TechBlog
            </h1>

            <p className="mt-4 text-gray-600">
                Thoughts, tutorials and things I'm learning.
            </p>
        </main> 
    )
}