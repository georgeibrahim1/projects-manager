export default function input({ isLabel, labelText, id, type = "text", value, onChange, placeholder }) {
    return (
            <div className="flex flex-col w-full mb-4">
                {isLabel && (
                <label htmlFor={id} className="mb-1 font-medium text-gray-700">
                    {labelText}
                </label>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        );
}
