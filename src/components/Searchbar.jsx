const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full sm:max-w-sm">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name or symbol..."
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        aria-label="Clear search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
      >
        ✕
      </button>
    )}
  </div>
);
export default SearchBar;