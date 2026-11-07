const ErrorMessage = ({ message, onRetry }) => (
  <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
    <p>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        Retry
      </button>
    )}
  </div>
);
export default ErrorMessage;