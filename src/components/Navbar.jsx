import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                { /* Logo*/ }
                <Link to="/" className="text-xl font-bold text-gray-900">
                    BezyBlog
                </Link>
                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black">
                        Home
                    </Link>

                    <Link to="/posts" className="text-sm font-medium text-gray-700 hover:text-black">
                        Posts
                    </Link>
                    
                    <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-black">
                        About
                    </Link>
                    
                    <Link to="/login" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                        Login
                    </Link>

                </div>
            </div>
        </nav>
    );
}