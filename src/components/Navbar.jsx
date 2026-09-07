import { Link } from "react-router-dom";
import Button from './Button';

export default function Navbar() {
    return (
        <nav className="bg-gray-200 shadow-md sticky top-0 z-50 cursor-pointer">
            <div className="flex items-center justify-between gap-4 p-4">
                <div>
                    <Link to="/" className="text-2xl font-bold text-blue-600">MyBlog</Link>
                </div>
                <div>
                    <Link  to="/create" className="text-blue-500"><Button>New Post</Button></Link>
                    <Link  to="/about" className="text-blue-500"><Button>About</Button></Link>
                    <Link  to="/contact" className="text-blue-500"><Button>Contact</Button></Link>
                </div>
                <div>
                    <Link  to="/signup" className="justify-end text-blue-500"><Button>Get Started</Button></Link>
                </div>
            </div>
        </nav>
    )
}