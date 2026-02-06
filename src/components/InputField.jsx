
const InputField = ({ icon, error, ...props }) => (
  <div>
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border 
      ${error ? "border-red-400" : "border-gray-300"}
      focus-within:border-indigo-500 bg-white`}
    >
      <span className="text-gray-500">{icon}</span>
      <input
        className="w-full outline-none bg-transparent text-sm"
        {...props}
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1">
        This field is required
      </p>
    )}
  </div>
);

export default InputField;