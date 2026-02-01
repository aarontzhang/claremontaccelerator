import TeamMember from "@/components/TeamMember";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const team = [
  {
    name: "Felix Peng",
    role: "Co-President",
    school: "HMC '28",
    image: "/team/felix.png",
  },
  {
    name: "Devansh Taliyan",
    role: "Co-President",
    school: "Pomona '27",
    image: "/team/devansh.webp",
  },
  {
    name: "Aaron Zhang",
    role: "Vice President",
    school: "CMC '28",
    image: "/team/aaron.jpg",
  },
  {
    name: "Joseph Santhosh",
    role: "Operations",
    school: "CMC '29",
    image: "/team/joseph.jpg",
  },
  {
    name: "Maélie Abt",
    role: "Marketing",
    school: "Pomona '29",
    image: "/team/Maelie.JPG",
  },
  {
    name: "Chase Witzansky",
    role: "Recruiting",
    school: "CMC '29",
    image: "/team/chase.webp",
  },
  {
    name: "Stanley Lo",
    role: "Studio",
    school: "CMC '27",
    image: "/team/stanley.jpeg",
  },
  {
    name: "Daniel Lo",
    role: "Marketing",
    school: "CMC '29",
    image: "/team/daniel.jpg",
  },
  {
    name: "Melanie Haro-Cortes",
    role: "Operations",
    school: "CMC '28",
    image: "/team/melanie.jpg",
  },
];

export default function WhoWeAre() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-[72px]">
        {/* Background Image */}
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

        {/* Content */}
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
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 50}>
                <TeamMember {...member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
