import TeamMember from "@/components/TeamMember";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const team = [
  {
    name: "Chase Witzansky",
    role: "Co-President",
    school: "CMC '29",
    image: "/team/chase.webp",
    linkedin: "https://linkedin.com/in/chase-witzansky",
  },
  {
    name: "Melanie Haro-Cortes",
    role: "Co-President",
    school: "CMC '28",
    image: "/team/melanie.jpg",
    linkedin: "https://linkedin.com/in/melanie-haro-cortes",
  },
  {
    name: "Maélie Abt",
    role: "CA Studio Director",
    school: "Pomona '29",
    image: "/team/Maelie.JPG",
    linkedin: "https://linkedin.com/in/maelie-abt",
  },
  {
    name: "Daniel Lo",
    role: "Marketing",
    school: "CMC '29",
    image: "/team/daniel.jpg",
    linkedin: "https://linkedin.com/in/daniel-lo-a137532a7",
  },
  {
    name: "Stanley Lo",
    role: "Member-at-large",
    school: "CMC '27",
    image: "/team/stanley.jpeg",
    linkedin: "https://linkedin.com/in/stanleylo4",
  },
];

const exOfficio = [
  {
    name: "Felix Peng",
    role: "Former Co-President",
    school: "HMC '28",
    image: "/team/felix.png",
    showYC: true,
  },
  {
    name: "Devansh Taliyan",
    role: "Former Co-President",
    school: "Pomona '27",
    image: "/team/devansh.webp",
    showYC: true,
  },
  {
    name: "Aaron Zhang",
    role: "Former Vice President",
    school: "CMC '28",
    image: "/team/aaron.jpg",
    showYC: true,
  },
  {
    name: "Joseph Santhosh",
    role: "Former Operations",
    school: "CMC '29",
    image: "/team/joseph.jpg",
    showSIF: true,
  },
];

export default function WhoWeAre() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[64px] border-b border-white/[0.13]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/acceleratormeeting-12.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="animate-fade-up opacity-0 font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Meet the Team
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-white/80 max-w-xl mx-auto">
            Students across the 5Cs building the future of entrepreneurship.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[var(--muted)] text-sm font-bold tracking-widest uppercase mb-6">
            Active Leadership Team Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 50}>
                <TeamMember {...member} />
              </ScrollReveal>
            ))}
          </div>

          {/* Ex Officio */}
          <div className="mt-16 pt-16 border-t border-white/[0.07]">
            <h2 className="text-[var(--muted)] text-sm font-bold tracking-widest uppercase mb-6">
              Ex Officio
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {exOfficio.map((member, index) => (
                <ScrollReveal key={member.name} delay={index * 50}>
                  <TeamMember {...member} muted />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
