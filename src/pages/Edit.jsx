import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Edit() {
    const { id } = useParams()
    const navigate = useNavigate
    const [post, setPost] = useState(null)

    useEffect(() => { postApi.getById(id).then(setPost)}, [id])

    const handleUpdate = (updatedPost) => {
        postApi.update(id, updatedPost).then(() => navigate(`/post/${id}`))
    }

    if (!post) return <p className="text-center py-20">Loading...</p>

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <PostForm initialData={post} onSubmit={handleUpdate} />
        </div>
    )
}