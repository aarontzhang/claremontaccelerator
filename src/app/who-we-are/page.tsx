import TeamMember from "@/components/TeamMember";

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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="animate-fade-up opacity-0 font-black text-4xl md:text-5xl text-white mb-2">
            Meet the Team
          </h1>
          <p className="animate-fade-up opacity-0 animation-delay-100 text-lg text-[var(--muted)] max-w-xl">
            Students across the 5Cs building the future of entrepreneurship.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <div className="animate-fade-up opacity-0 animation-delay-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {team.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-10 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-white font-bold text-xl mb-4">About Our Team</h3>
          <p className="text-[var(--muted-light)] text-lg leading-relaxed mb-4">
            We&apos;re students who have worked at startups, launched our own projects, and experienced firsthand the challenges of building something from scratch. That&apos;s why we started the <span className="text-white font-medium">Claremont Accelerator</span>.
          </p>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Our team spans all five Claremont Colleges, bringing together perspectives from engineering, business, design, and the liberal arts. We handle everything from recruiting and operations to marketing and founder support, so startups in our program can focus on what matters most: building great products.
          </p>
        </div>
      </section>
    </div>
  );
}
