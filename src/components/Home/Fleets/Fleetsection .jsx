import Link from "next/link";
import FleetScroll from "./Fleetscrol";

const FleetSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
    cache: "no-store",
  });
  const cars = await res.json();

  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 mb-16 flex justify-between items-end">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364] mb-4 block">
            THE COLLECTION
          </span>
          <h2
            className="text-[48px] font-semibold leading-tight tracking-tight text-[#e4e1e9]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Exclusive Fleet
          </h2>
        </div>
        <Link
          href="/explore-cars"
          className="text-[11px] font-semibold tracking-[0.15em] uppercase border border-[#e6c364] text-[#e6c364] px-8 py-3 rounded-full hover:bg-[#e6c364] hover:text-[#3d2e00] transition-all"
        >
          View All
        </Link>
      </div>

      {/* Client scroll component */}
      <FleetScroll cars={cars} />
    </section>
  );
};

export default FleetSection;