import Link from "next/link";
import { site } from "@/content/site";

// Abstract constellation — intentionally NOT a geographic map.
export function ServiceAreaMap() {
  const nodes = [
    { x: 500, y: 300, r: 14, label: site.address.city, href: "/contact", hub: true },
    { x: 260, y: 180, r: 10, label: "Los Angeles", href: "/areas/los-angeles" },
    { x: 250, y: 430, r: 10, label: "Ventura", href: "/areas/ventura" },
    { x: 720, y: 200, r: 10, label: "San Bernardino", href: "/areas/san-bernardino" },
    { x: 730, y: 420, r: 10, label: "Orange", href: "/areas/orange" },
  ];

  return (
    <div className="mt-12 rounded-3xl border border-ink/10 bg-white p-6 sm:p-10">
      <svg viewBox="0 0 1000 600" role="img" aria-label="Service area constellation: Van Nuys office linked to Los Angeles, Ventura, San Bernardino, and Orange Counties" className="w-full">
        {nodes.slice(1).map((n) => (
          <line
            key={n.label}
            x1={nodes[0].x}
            y1={nodes[0].y}
            x2={n.x}
            y2={n.y}
            stroke="#d9a441"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            opacity="0.6"
          />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            {n.hub && (
              <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill="#d9a441" opacity="0.18" className="pulse-glow" />
            )}
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.hub ? "#9a6b12" : "#d9a441"} />
            <text
              x={n.x}
              y={n.y + n.r + 26}
              textAnchor="middle"
              className="fill-ink"
              style={{ fontSize: 22, fontWeight: 500 }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {nodes.map((n) => (
          <li key={n.label}>
            <Link
              href={n.href}
              className="inline-flex min-h-12 items-center rounded-full border border-ink/15 px-5 text-ink transition-colors hover:border-gold-500 hover:bg-gold-300/20"
            >
              {n.hub ? "Van Nuys office" : `${n.label} County`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
