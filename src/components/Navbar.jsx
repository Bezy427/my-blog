import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:items-center sm:flex-row sm:justify-between px-4 py-4">
                { /* Logo*/ }
                <Link to="/" className="text-xl font-bold text-gray-900">
                    TechBlog
                </Link>
                {/* Navigation */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
                    <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black">
                        Home
                    </Link>

                    <Link to="/posts" className="text-sm font-medium text-gray-700 hover:text-black">
                        Posts
                    </Link>
                    
                    <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-black">
                        About
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link 
                                to="/dashboard"
                                className="text-sm font-medium text-gray-=700 hover:text-black"
                            >
                                Dashboard
                            </Link>

                            <span className="hidden text-sm text-gray-500 md:block">
                                {user?.email}
                            </span>

                            <button 
                                onClick={handleLogout}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}