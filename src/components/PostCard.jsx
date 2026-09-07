export default function PostCard({ title, excerpt, date, image}) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{date}</p>
                <h2 className="text-xl text-blue-400 font-bold mb-2 hover:text-blue-600 cursor-pointer">{title}</h2>
                <p className="text-gray-600">{excerpt}</p>
                <button className="mt-4 text-purple-600 font-semibold hover:underline">
                    Read More 'n 
                </button>
            </div>
        </div>
    )
}