export default function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    rows=6,
}) {
    return (
        <div>
            <label 
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-900"
            >
                {label}
            </label>

            <textarea
                id={name} 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                aria-invalid={Boolean(error)}
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 ${
                    error
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-gray-200" 
                }`} 
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}