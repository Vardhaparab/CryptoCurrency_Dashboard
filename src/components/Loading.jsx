const Loading = ({ label = "Loading..." }) => (
  <div className="flex items-center justify-center gap-3 py-10 text-gray-500 dark:text-gray-400">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
    <span>{label}</span>
  </div>
);
export default Loading;