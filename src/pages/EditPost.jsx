import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../services/api";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

export default function EditPost() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    console.log("Post ID from URL:", id);

    useEffect(() => {
        if (!id) {
            setError("Post ID is missing from the URL.");
            setLoading(false);
            return;
        }

        async function loadPost() {
            try {
                const post = await getPost(id);
                setTitle(post.title);
                setContent(post.content);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!id) {
            setError("Cannot update post: Post ID is missing.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            await updatePost(id, {
                title,
                content,
            });

            navigate(`/posts/${id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }   

    if (loading) {
        return (
            <p className="p-8 text-center">
                Loading post...
            </p>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-3xl font-bold">
                Edit Post
            </h1>

            {error && (
                <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
                    {error}
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
                    />
                </div>

                <div>
                    <label 
                        htmlFor="content"
                        className="mb-2 block font-medium "
                    >
                        Content
                    </label>

                    <Textarea 
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                        rows={12} 
                        className="w-full"
                    />
                </div>

                <Button 
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </main>
    );
}