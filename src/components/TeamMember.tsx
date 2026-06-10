"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  school: string;
  image: string;
  muted?: boolean;
  showYC?: boolean;
}

export default function TeamMember({
  name,
  role,
  school,
  image,
  muted = false,
  showYC = false,
}: TeamMemberProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`group bg-[var(--surface)] rounded-xl p-4 hover:bg-[var(--surface-elevated)] transition-all duration-300 border border-[var(--border)] ${muted ? "opacity-50" : ""}`}>
      {/* Image or Initials Fallback */}
      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-[var(--surface-elevated)] flex items-center justify-center">
        <span className="text-3xl font-black text-[var(--muted)]">{initials}</span>
        {!imageError && (
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${muted ? "grayscale" : ""}`}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className={`font-black text-base flex items-center gap-1.5 ${muted ? "text-[var(--muted)]" : "text-white"}`}>
          {name}
          {showYC && (
            <Image
              src="/logos/partners/y-combinator2.png"
              alt="Y Combinator"
              width={13}
              height={13}
              className="inline-block flex-shrink-0 opacity-60"
            />
          )}
        </h3>
        <p className={`text-sm font-medium ${muted ? "text-[var(--muted)]" : "text-[#a5b4fc]"}`}>{role}</p>
        <p className="text-[var(--muted)] text-xs">{school}</p>
      </div>
    </div>
  );
}
