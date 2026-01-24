import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "large";
  external?: boolean;
}

const bubbleStyle = {
  background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
  animation: "bubble 8s ease-in-out infinite",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  external = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all hover:scale-105";

  const variants = {
    primary:
      "text-slate-800 font-bold",
    secondary:
      "bg-white text-black hover:bg-white/90",
    outline:
      "border-2 border-white/50 text-white hover:border-white hover:bg-white/10",
  };

  const sizes = {
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const className = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
  const inlineStyle = variant === "primary" ? bubbleStyle : undefined;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={inlineStyle}
      >
        {children}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={inlineStyle}>
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  );
}
