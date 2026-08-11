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

const DOCK_AT = 90; // px scrolled before the pill docks flush
const BAR_H = 68; // capsule height (py-3.5 + 40px logo)
const RADIUS = BAR_H / 2; // a true pill. NOT 9999px (`rounded-full`) — the
// transition from 9999→0 spends almost all its time above 34px, where the
// corners already look fully round, so the change appears to snap at the end.
const EDGE = "rgba(255, 255, 255, 0.13)";

// .glass draws its top specular edge as an inset box-shadow, not a border, so
// it survives borderTopColor:transparent. Restate the whole stack per state —
// same shadow count and order — so it interpolates instead of snapping.
const SHADOW = (topEdge: number) =>
  `inset 0 1px 0 0 rgba(255, 255, 255, ${topEdge}),` +
  ` inset 0 -1px 0 0 rgba(255, 255, 255, 0.03),` +
  ` 0 24px 56px -16px rgba(0, 0, 0, 0.75)`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > DOCK_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Plain fixed shell — no transform/opacity here, or the capsule's
    // backdrop-filter would have nothing to sample.
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[padding] duration-500 ease-out ${
        docked ? "px-0 pt-0" : "px-4 pt-7"
      }`}
    >
      <nav
        className="glass glass-nav mx-auto transition-[border-radius,max-width,border-color,box-shadow] duration-500 ease-out"
        style={{
          maxWidth: docked ? "100%" : "80rem",
          borderRadius: isOpen ? "24px" : docked ? "0px" : `${RADIUS}px`,
          // Fade the top and side edges out instead of removing border-width,
          // so the bar never shifts a pixel. Bottom hairline stays.
          borderTopColor: docked ? "transparent" : EDGE,
          borderLeftColor: docked ? "transparent" : EDGE,
          borderRightColor: docked ? "transparent" : EDGE,
          borderBottomColor: EDGE,
          boxShadow: SHADOW(docked ? 0 : 0.16),
        }}
      >
        {/* z-10 keeps content above .glass::before's specular sheen */}
        <div className="relative z-10 px-5 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Claremont Accelerator"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span
                className="text-xl font-black tracking-tight text-white"
                style={{ fontFamily: 'Aileron, Arial, sans-serif' }}
              >
                Claremont Accelerator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 pr-2">
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
