import ExploreCarsCard from "@/components/ExploreCars/ExploreCarsCard";
import Link from "next/link";

const FleetSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });
  const cars = await res.json();

  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className=" px-4  mb-16 flex flex-col md:flex-row justify-between items-end">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3">
        {cars.map((car) => (
          <ExploreCarsCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default FleetSection;
