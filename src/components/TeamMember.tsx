"use client";

import Image from "next/image";
import { useState } from "react";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";

interface TeamMemberProps {
  name: string;
  role: string;
  school: string;
  image: string;
  muted?: boolean;
  showYC?: boolean;
  showSIF?: boolean;
  linkedin?: string;
}

export default function TeamMember({
  name,
  role,
  school,
  image,
  muted = false,
  showYC = false,
  showSIF = false,
  linkedin,
}: TeamMemberProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group glass glass-flat glass-hover rounded-xl p-4">
      {/* Image or Initials Fallback */}
      <div className={`relative z-10 w-full aspect-square mb-3 rounded-lg overflow-hidden bg-white/[0.05] flex items-center justify-center ${muted ? "opacity-60" : ""}`}>
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
      <div className={`relative z-10 ${muted ? "opacity-75" : ""}`}>
        <h3 className={`font-black text-base flex items-center gap-1.5 ${muted ? "text-[var(--muted)]" : "text-white"}`}>
          <span className="truncate">{name}</span>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded bg-[#0165fc]/70 text-white hover:bg-[#0165fc] transition-colors duration-200"
            >
              <IconBrandLinkedinFilled className="w-3.5 h-3.5" />
            </a>
          )}
          {showYC && (
            <Image
              src="/logos/partners/y-combinator2.png"
              alt="Y Combinator"
              width={13}
              height={13}
              className="inline-block flex-shrink-0 opacity-60"
            />
          )}
          {showSIF && (
            <Image
              src="/logos/partners/cmc-sif.png"
              alt="CMC SIF"
              width={30}
              height={5}
              className="inline-block flex-shrink-0 opacity-60 brightness-0 invert"
            />
          )}
        </h3>
        <p className={`text-sm font-medium ${muted ? "text-[var(--muted)]" : "text-[#a5b4fc]"}`}>{role}</p>
        <p className="text-[var(--muted)] text-xs">{school}</p>
      </div>
    </div>
  );
}
