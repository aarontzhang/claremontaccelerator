import Image from "next/image";
import { BACKER_LOGOS } from "@/lib/backers";
import Pill from "@/components/Pill";

// Renders one pill per `backers:` entry in a startup's frontmatter. Backers
// without a logo in BACKER_LOGOS fall back to a plain text pill.
export default function BackerPills({ backers }: { backers: string[] }) {
  return (
    <>
      {backers.map((backer) => {
        const logo = BACKER_LOGOS[backer.toLowerCase()];
        return (
          <Pill key={backer}>
            {logo && (
              <Image
                src={logo}
                alt=""
                width={12}
                height={12}
                className="w-3 h-3 rounded-[2px] object-contain"
              />
            )}
            {backer}
          </Pill>
        );
      })}
    </>
  );
}
