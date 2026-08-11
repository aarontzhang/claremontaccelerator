/**
 * Fixed background layer of drifting blue light + film grain.
 *
 * This is what makes `.glass` actually read as glass: backdrop-filter needs
 * gradient and high-frequency texture behind it to blur. On a flat fill the
 * panes fall back to looking like plain translucent rectangles.
 *
 * Pair it with a dark base on the page wrapper (bg-[#06070c]) and put the
 * page content in a sibling `relative z-10` wrapper.
 */
export default function PageAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="bloom absolute -top-[22%] left-[4%] h-[70vh] w-[70vh] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "radial-gradient(circle, #0165fc 0%, transparent 70%)" }}
      />
      <div
        className="bloom bloom-slow absolute top-[24%] right-0 h-[58vh] w-[58vh] rounded-full opacity-[0.11] blur-[140px]"
        style={{ background: "radial-gradient(circle, #4f8dff 0%, transparent 70%)" }}
      />
      <div
        className="bloom absolute bottom-[-18%] left-[34%] h-[52vh] w-[52vh] rounded-full opacity-[0.09] blur-[150px]"
        style={{ background: "radial-gradient(circle, #7aa9ff 0%, transparent 70%)" }}
      />
      <div className="grain-layer absolute inset-0" />
    </div>
  );
}
