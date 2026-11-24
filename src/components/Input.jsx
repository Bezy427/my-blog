
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
    disabled = false,
    autoComplete,
    className = "",
}) {
    const inputId = id || name;
    const errorId = `${inputId}-error`;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
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
                disabled={disabled}
                autoComplete={autoComplete}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`
                    w-full rounded-xl border bg-white px-4 py-3
                    text-sm text-slate-800 outline-none transition
                    placeholder:text-slate-400
                    focus:ring-4
                    disabled:cursor-not-allowed disabled:bg-slate-100
                    disabled:opacity-60
                    ${
                        error
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }
                    ${className}
                `}
            />

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-2 text-sm text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
