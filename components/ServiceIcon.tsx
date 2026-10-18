// Minimal animated-feel line icons (stroke-based; CSS hover draws them).
// Names map to service slugs; a generic fallback keeps this total.
const PATHS: Record<string, string> = {
  "skilled-nursing": "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z",
  "home-health-aides": "M3 11 12 4l9 7M6 10v9h12v-9",
  DEFAULT: "M12 3v18M5 12h14",
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const d = PATHS[name] ?? PATHS.DEFAULT;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
