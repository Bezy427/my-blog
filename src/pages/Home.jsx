import { useState } from "react"
import Navbar from "../components/Navbar"
import PostCard from "../components/PostCard"

export default function Home() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl">
                Welcome to TechBlog
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                Thoughts, tutorials and things I'm learning.
            </p>
        </main> 
    )
}