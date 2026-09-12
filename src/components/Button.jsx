export default function Button({
    children, 
    type= "button",
    onClick,
    loading = false,
    disabled = false,
    variant="primary",
    fullWidth = false,
    className="",
}) {
    const variants = {
        primary: "bg-black text-white hover:bg-blue-800",
        secondary: "bg-gray-100 hover:bg-gray-900 text-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700",
    }
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                rounded-lg px-5 py-3 text-sm font-medium transition 
                ${variants[variant]}
                ${fullWidth ? "w-full" : ""}
                ${
                    disabled || loading
                        ? "cursor-not-allowed opacity-50"
                        : ""
                }
                ${className}
            `}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}