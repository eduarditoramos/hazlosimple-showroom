export function ChevL({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevR({ size = 16, className = "" }) {
  return (
    <svg className={className} fill="none" height={size} stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
