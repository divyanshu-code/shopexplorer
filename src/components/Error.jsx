const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const RetryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const STATUS_META = {
  400: { title: 'Bad Request',         hint: 'The request was malformed. Please try again.' },
  401: { title: 'Unauthorized',        hint: 'You need to be signed in to view this content.' },
  403: { title: 'Access Forbidden',    hint: "You don't have permission to access this resource." },
  404: { title: 'Not Found',           hint: "The resource you're looking for doesn't exist." },
  500: { title: 'Server Error',        hint: 'Our servers hit a snag. Please try again in a moment.' },
  503: { title: 'Service Unavailable', hint: 'The service is temporarily down. Hang tight!' },
};

const DEFAULT_META = {
  title: 'Something Went Wrong',
  hint: 'An unexpected error occurred. Please try again.',
};

const Error = ({ message, status, onRetry, fullScreen = true }) => {
  const meta = STATUS_META[status] ?? DEFAULT_META;

  return (
    <div
      role="alert"
      className={`
        flex flex-col items-center justify-center gap-8 px-4 text-center
        ${fullScreen ? 'min-h-screen bg-[#030712]' : 'min-h-[400px]'}
      `}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl scale-150" />
        <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 shadow-xl shadow-red-500/10">
          <AlertIcon />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 max-w-md">
        {status && (
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase">
            Error {status}
          </span>
        )}
        <h2 className="text-2xl font-bold text-white">{meta.title}</h2>
        <p className="text-sm text-gray-400 leading-relaxed">{meta.hint}</p>
        {message && (
          <details className="w-full mt-1 group">
            <summary className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer select-none transition-colors">
              View error details
            </summary>
            <p className="mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-500 font-mono text-left break-words">
              {message}
            </p>
          </details>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-xl
              text-sm font-bold text-white
              bg-gradient-to-r from-violet-600 to-indigo-600
              hover:from-violet-500 hover:to-indigo-500
              shadow-md shadow-violet-500/25 hover:shadow-violet-500/40
              hover:scale-[1.03] active:scale-[0.97]
              transition-all duration-200
            "
          >
            <RetryIcon />
            Try Again
          </button>
        )}
        <a
          href="/"
          className="
            flex items-center gap-2 px-6 py-2.5 rounded-xl
            text-sm font-semibold text-white/70 hover:text-white
            bg-white/5 hover:bg-white/10
            border border-white/10 hover:border-white/20
            hover:scale-[1.03] active:scale-[0.97]
            transition-all duration-200
          "
        >
          <HomeIcon />
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
