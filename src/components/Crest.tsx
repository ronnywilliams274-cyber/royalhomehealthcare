/** Placeholder brand mark (crown over a house). Decorative - the adjacent text carries the name.
 *  Replace the paths with the agency's vector logo when available. */
export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M4 12l4 10h16l4-10-6 4-6-8-6 8-6-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 26h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 14v6M13 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
