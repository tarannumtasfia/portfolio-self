export default function PageLoader({ label = "Loading...", icon: Icon }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-200 dark:border-indigo-900/80" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#3e0097] dark:border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        {Icon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={18} className="text-[#3e0097] dark:text-indigo-400" aria-hidden />
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  );
}
