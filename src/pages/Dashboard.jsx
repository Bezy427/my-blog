import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome to your dashboard
                    </p>            
                </div>

                <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100">
                    Logout
                </button>
            </div>

            <div className="mt-8">
                <Link 
                    to="/posts/create"
                    className="inline-block rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
                >
                    Create Post
                </Link>
            </div>
        </main>
    );
}