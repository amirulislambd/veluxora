import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Select Your Drive",
    desc: "Browse our curated collection of supercars and luxury SUVs through our mobile-first booking platform.",
    offset: false,
  },
  {
    num: "02",
    title: "Instant Verification",
    desc: "A streamlined digital check-in process that verifies your credentials in minutes, not hours.",
    offset: true,
  },
  {
    num: "03",
    title: "Arrival & Ignition",
    desc: "Your vehicle arrives detailed and ready. One short walkthrough and the keys are yours to keep.",
    offset: false,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12">
          <h2
            className="text-[48px] font-semibold leading-tight tracking-tight text-[#e4e1e9] md:max-w-md"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Journey Starts Here.
          </h2>
          <div className="h-px bg-[#4d4637]/30 flex-grow mx-12 hidden md:block" />
          <Link
            href="/register"
            className="border border-[#e6c364] text-[#e6c364] text-[11px] font-bold tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-[#e6c364] hover:text-[#3d2e00] transition-all"
          >
            View Membership
          </Link>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Line connector */}
          <div
            className="absolute top-1/2 left-0 w-full h-px hidden md:block opacity-20 -translate-y-12"
            style={{ background: "linear-gradient(90deg, transparent 0%, #e6c364 50%, transparent 100%)" }}
          />
          {steps.map(({ num, title, desc, offset }) => (
            <div key={num} className={`relative z-10 space-y-6 ${offset ? "md:pt-24" : ""}`}>
              <div
                className="text-[80px] font-bold text-[#e6c364] leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {num}
              </div>
              <h4
                className="text-2xl font-semibold text-[#e4e1e9]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </h4>
              <p className="text-base text-[#d0c5b2] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;