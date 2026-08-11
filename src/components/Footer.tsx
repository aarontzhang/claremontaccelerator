import { IconBrandInstagramFilled, IconBrandLinkedinFilled } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left: contact + socials */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:claremontaccelerator@gmail.com"
              className="text-white hover:text-[var(--muted-light)] transition-colors font-medium text-sm"
            >
              claremontaccelerator@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/company/claremontaccelerator/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedinFilled className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.instagram.com/claremontaccelerator/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
              aria-label="Instagram"
            >
              <IconBrandInstagramFilled className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Right: copyright */}
          <p className="text-[var(--muted)] text-sm">
            © {new Date().getFullYear()} Claremont Accelerator. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
