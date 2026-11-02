import TeamMember from "@/components/TeamMember";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

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
    image: "/team/melanie.webp",
    linkedin: "https://linkedin.com/in/melanie-haro-cortes",
  },
  {
    name: "Maélie Abt",
    role: "CA Studio Co-Director",
    school: "Pomona '29",
    image: "/team/maelie.webp",
    linkedin: "https://linkedin.com/in/maelie-abt",
  },
  {
    name: "Ethan Vicknair",
    role: "CA Studio Co-Director",
    school: "Pomona '28",
    image: "/team/ethan.webp",
    linkedin: "https://www.linkedin.com/in/ethan-vicknair-111614268/",
  },
  {
    name: "Daniel Lo",
    role: "Head of Growth",
    school: "CMC '29",
    image: "/team/daniel.webp",
    linkedin: "https://linkedin.com/in/daniel-lo-a137532a7",
  },
  {
    name: "Stanley Lo",
    role: "Member-at-large",
    school: "CMC '27",
    image: "/team/stanley.webp",
    linkedin: "https://linkedin.com/in/stanleylo4",
  },
  {
    name: "Michelle Lu",
    role: "Operations",
    school: "HMC '29",
    image: "/team/michelle.webp",
    linkedin: "https://www.linkedin.com/in/michelle-lu8/",
  },
];

const exOfficio = [
  {
    name: "Felix Peng",
    role: "Former Co-President",
    school: "HMC '28",
    image: "/team/felix.webp",
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
    image: "/team/aaron.webp",
    showYC: true,
  },
  {
    name: "Joseph Santhosh",
    role: "Former Operations",
    school: "CMC '29",
    image: "/team/joseph.webp",
    showSIF: true,
  },
];

export default function WhoWeAre() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10">
      {/* Hero Section with Background Image */}
      <PageHero
        image="/acceleratormeeting-12.webp"
        title="Meet the Team"
        subtitle="Students across the 5Cs building the future of entrepreneurship."
        paddingTop={64}
      />

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
