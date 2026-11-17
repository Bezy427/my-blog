export default function Input({
    id,
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    required = false,
}) {
    const inputId = id || name;

    return (
        <div>
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-medium text-gray-900"
                >
                    {label}
                </label>
            )}

            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 ${
                    error
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-gray-200"
                }`}
            />

            {error && (
                <p
                    id={`${inputId}-error`}
                    className="mt-2 text-sm text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}