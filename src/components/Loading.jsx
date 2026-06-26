const Loading = ({
  message = 'Fetching products for you…',
  fullScreen = true,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`
        flex flex-col items-center justify-center gap-8
        ${fullScreen ? 'min-h-screen bg-[#030712]' : 'min-h-[400px]'}
      `}
    >
      <div className="relative w-20 h-20">
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-500/30 animate-spin" />
        <span
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-indigo-400 border-l-indigo-400/30 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
        <span className="absolute inset-[30%] rounded-full bg-violet-500 blur-[2px] animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-bold tracking-widest text-violet-400 uppercase">
          Shop<span className="text-white">Sphere</span>
        </p>
        <p className="text-sm text-gray-400 flex items-center gap-0.5">
          {message.replace(/…$/, '')}
          <span className="inline-flex gap-0.5 ml-1">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="w-1 h-1 rounded-full bg-gray-500 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </span>
        </p>
      </div>

      <span className="sr-only">{message}</span>
    </div>
  );
};

export default Loading;
