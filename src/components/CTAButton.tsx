import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight, IconExternalLink } from "@tabler/icons-react";

// The solid blue pill CTA. Previously carried `variant`
// ("primary"/"secondary"/"outline"), a `disabled` state and a `default` size
// that no caller ever used; those branches are gone. `icon` was added so pages
// that want a different trailing glyph can reuse this instead of hand-writing
// the same anchor again.
interface CTAButtonProps {
  href: string;
  children: ReactNode;
  size?: "default" | "large";
  external?: boolean;
  /** Trailing glyph. Defaults to an external-link or arrow icon by link type. */
  icon?: ReactNode;
}

const SIZES = {
  default: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",
};

export default function CTAButton({
  href,
  children,
  size = "default",
  external = false,
  icon,
}: CTAButtonProps) {
  const className = `inline-flex items-center justify-center gap-2 rounded-full transition-all hover:scale-105 text-white font-bold ${SIZES[size]}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ background: "var(--accent)" }}
      >
        {children}
        {icon ?? <IconExternalLink className="w-4 h-4" stroke={2} />}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={{ background: "var(--accent)" }}>
      {children}
      {icon ?? <IconArrowRight className="w-4 h-4" stroke={2} />}
    </Link>
  );
}
