import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
// import { postsApi } from

export default function Create() {
    const navigate = useNavigate()

    // const handleCreate = (post) => {
    //     postsApi.create(post).then(() => navigate('/'))
    // }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <PostForm />
        </div>
    )
}