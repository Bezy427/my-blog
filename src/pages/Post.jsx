export default function Post() {
    const { id } = useParams()

    const post = {
        title: "Deep Dive into React",
        date: "Sept 4, 2026",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quis repudiandae distinctio tempora, quas omnis modi architecto, reprehenderit ut tempore tenetur magni? Aperiam, dolores soluta iure eaque modi possimus reiciendis."
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <p className="text-gray-500 mb-2">{post.date}</p>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <img src="https://picsum.photos/800/400" className="rounded-lg mb-6" />
            <p className="text-lg leading-8 text-gray-700">{post.content}</p>
            <Button variant="ghost" className="mt-8">Back to Posts</Button>
        </div>
    )
}