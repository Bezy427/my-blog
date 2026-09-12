import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { Textarea } from "@headlessui/react";
import { Input } from "@headlessui/react";
// import { postsApi } from

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setErrors("");

        try {
            await createPost({
                title,
                content,
            });

            navigate("/posts");
        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-3xl font-bold">
                Create Post
            </h1>

            {errors && (
                <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
                    {errors}
                </div>
            )}

            <form 
                onSubmit={handleSubmit} 
                className="mt-8 space-y-6"
            >
                <div>
                    <label 
                        htmlFor="title"
                        className="mb-2 block font-medium"
                    >
                        Title
                    </label>

                    <Input 
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                        placeholder="Enter your post title"
                    />    
                </div>

                <div>
                    <label 
                        htmlFor="content" 
                        className="mb-2 block font-medium"
                    >
                        Content
                    </label>

                    <Textarea 
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                        rows={10}
                        placeholder="Write your post..." 
                        error={errors.content}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? "Publishing..." : "Publish Post"}
                </button>
            </form>
        </div>
    )
}