
export default function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    rows = 6,
    disabled = false,
    required = false,
    className = "",
}) {
    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`
                    w-full resize-y rounded-xl border bg-slate-50
                    px-4 py-3 text-sm text-slate-900
                    placeholder:text-slate-400
                    outline-none transition duration-200
                    focus:bg-white focus:ring-4
                    disabled:cursor-not-allowed disabled:opacity-60
                    ${
                        error
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                    }
                    ${className}
                `}
            />

            {error && (
                <p
                    id={`${name}-error`}
                    role="alert"
                    className="mt-2 text-sm text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
