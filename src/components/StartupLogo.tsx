import Image from "next/image";

interface StartupLogoProps {
  name: string;
  logo: string;
  website?: string;
}

export default function StartupLogo({ name, logo, website }: StartupLogoProps) {
  const content = (
    <div className="group relative bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center min-h-[100px]">
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
      />
    </div>
  );

  if (website) {
    return (
      <a href={website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
