"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/startups", label: "Portfolio" },
  { href: "/found", label: "Founders" },
  { href: "/intern", label: "Interns" },
];

const SUBSTACK_URL = "https://claremontaccelerator.substack.com/";

const FADE_END = 80; // px of scroll over which the frost fades fully in

// Interpolate a→b by the scroll progress t (0..1).
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// .glass draws its top specular edge as an inset box-shadow, not a border, so
// it survives borderTopColor:transparent. Restate the whole stack here so every
// alpha can be scrubbed by scroll rather than toggled.
const SHADOW = (topEdge: number, botEdge: number, cast: number) =>
  `inset 0 1px 0 0 rgba(255, 255, 255, ${topEdge}),` +
  ` inset 0 -1px 0 0 rgba(255, 255, 255, ${botEdge}),` +
  ` 0 24px 56px -16px rgba(0, 0, 0, ${cast})`;

// The glass fill + backdrop-filter are normally set by .glass-nav in CSS. We
// restate both here so they track scroll: at the very top the bar is fully
// transparent with no blur; by FADE_END the frosted material is fully in.
const FILL = (a1: number, a2: number) =>
  `linear-gradient(to bottom, rgba(255, 255, 255, ${a1}) 0%, rgba(255, 255, 255, ${a2}) 100%)`;
const BLUR = (px: number, bright: number) =>
  `blur(${px}px) saturate(100%) brightness(${bright})`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // rAF-throttle so the material tracks scroll 1:1 without a render per event.
    let raf = 0;
    const update = () => {
      raf = 0;
      setProgress(Math.min(1, Math.max(0, window.scrollY / FADE_END)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // The open mobile menu forces the material fully on, so the dropdown isn't
  // floating over a transparent bar.
  const t = isOpen ? 1 : progress;

  return (
    // Plain fixed shell — no transform/opacity here, or the capsule's
    // backdrop-filter would have nothing to sample.
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className="glass glass-nav"
        style={{
          maxWidth: "100%",
          borderRadius: "0px",
          // No CSS transition — the scroll position itself scrubs each value.
          // Standard + WebKit set together here (React inline styles, so no
          // Lightning CSS to collapse the pair) — otherwise the class's
          // -webkit- value would linger on Safari and never un-blur.
          background: FILL(mix(0, 0.1, t), mix(0, 0.045, t)),
          backdropFilter: BLUR(mix(0, 5, t), mix(1, 0.65, t)),
          WebkitBackdropFilter: BLUR(mix(0, 5, t), mix(1, 0.65, t)),
          // Full-width bar: only the bottom hairline; top/side edges transparent.
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: `rgba(255, 255, 255, ${mix(0, 0.13, t)})`,
          boxShadow: SHADOW(mix(0, 0.16, t), mix(0, 0.03, t), mix(0, 0.75, t)),
          // Drives the ::before dome highlight opacity (see globals.css).
          ["--nav-frost" as string]: t,
        }}
      >
        {/* z-10 keeps content above .glass::before's specular sheen */}
        <div className="relative z-10 px-[42px] py-[23px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-[11px] hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Claremont Accelerator"
                width={42}
                height={42}
                className="w-[42px] h-[42px] object-contain"
              />
              <span
                className="text-[21px] font-black tracking-tight text-white"
                style={{ fontFamily: 'Aileron, Arial, sans-serif' }}
              >
                Claremont Accelerator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-[34px] pr-2 text-[17px]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`tracking-tight transition-colors relative group ${
                        isActive
                          ? "text-white nav-link-active"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {!isActive && (
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tracking-tight transition-colors relative group text-white/60 hover:text-white"
                >
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </a>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IconX className="w-6 h-6" stroke={2} />
              ) : (
                <IconMenu2 className="w-6 h-6" stroke={2} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-3 pb-2 border-t border-white/[0.08] pt-3">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block tracking-tight py-1.5 ${
                          isActive ? "text-[#3385fd]" : "text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={SUBSTACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block tracking-tight py-1.5 text-white"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
