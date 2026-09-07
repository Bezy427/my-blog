export default function Button({children, variant="primary"}) {
    const styles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        ghost: "bg-gray-100 hover:bg-gray-200 text-gray-800"
    }
    return (
        <button className={"px-4 py-2 rounded-lg font-semibold transition ${styles[variant]}"}>{children}</button>
    )
}