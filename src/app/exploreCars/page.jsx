import { Suspense } from "react";
import ExploreCarsCard from "@/components/ExploreCars/ExploreCarsCard";
import ExploreFilterBar from "@/components/ExploreCars/Explorefilterbar";

export const metadata = {
  title: "Explore the Fleet | VELUXORA — High-Performance Supercars",
  description:
    "Discover a world of automotive excellence. Browse Veluxora's exclusive and curated collection of high-performance luxury sports cars and SUVs.",
  keywords: ["Explore Cars", "Luxury Fleet", "Supercar Collection", "Rent Sports Car", "VELUXORA Fleet"],
  openGraph: {
    title: "Explore the Fleet | VELUXORA",
    description: "Discover a world of automotive excellence. Experience our premium collection of high-performance vehicles.",
    url: "https://veluxora.vercel.app/exploreCars",
    siteName: "VELUXORA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "VELUXORA Luxury Fleet Showcase" }],
  },
};

// ─── Dynamic Server Component — re-renders per searchParams ────────────────
async function CarList({ search, type, available }) {

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (type && type !== "All") params.set("type", type);
  if (available && available !== "All") params.set("available", available);

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cars${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const cars = await res.json();

  if (!cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-[#e6c364]/40">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-[#99907e] text-base">No cars match your current filters.</p>
        <p className="text-[#5c5548] text-sm">Try adjusting your search or clearing the filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto p-4">
      {cars.map((car) => (
        <ExploreCarsCard car={car} key={car._id} />
      ))}
    </div>
  );
}


function CarListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-[#4d4637]/30 animate-pulse" style={{ background: "rgba(20,20,26,0.7)" }}>
          <div className="h-44 bg-[#2a2820]/60" />
          <div className="p-4 flex flex-col gap-3">
            <div className="h-4 w-3/4 rounded bg-[#3a3628]/70" />
            <div className="h-3 w-1/2 rounded bg-[#3a3628]/50" />
            <div className="mt-2 h-8 w-full rounded-lg bg-[#3a3628]/60" />
          </div>
        </div>
      ))}
    </div>
  );
}


const ExploreCars = async ({ searchParams }) => {
  const resolved = await searchParams;
  const search = resolved?.search || "";
  const type = resolved?.type || "";
  const available = resolved?.available || "";


  const listKey = `${search}|${type}|${available}`;

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            className="w-full h-full object-cover"
            alt="Luxury sports car fleet"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQwZpymX55G-s3kTp8bdBR386YU29luV2AGWNNeh4iqL93yJNBsgzsRIuM7ylXSLsD0oRLLUxXH6itYm9VNRqu6aeiKKq-Zda8SJNO49UUaBiz19jpGbC_0UaHwkQ7-btwtdVwuPjyG71PXSUPXLNm44_ubN1xmG-KsQsEFDRp5xFY9SGFfO2j9KmPSRUrVuksuLkVe7lKT5ycReCf8nXiHqw8sqW_OSqrsOrv_NmePP8_r0v6YVnXtXDGjj1Mw0J3jGQmt-pixZo"
          />
          <div className="absolute inset-0 hero-gradient z-20" />
        </div>
        <div className="relative z-30 container mx-auto px-gutter w-full">
          <div className="flex flex-col justify-center items-center">
            <h1
              className="text-primary italic mb-4 text-2xl md:text-4xl lg:text-5xl text-center font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore the Fleet
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed text-center">
              Discover a world of automotive excellence. Our vast collection of high-performance vehicles is designed to captivate and inspire.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar — Suspense required for useSearchParams() */}
      <Suspense fallback={<div className="w-full h-[62px] border-b border-[#4d4637]/55" style={{ background: "rgba(13,13,18,0.85)" }} />}>
        <ExploreFilterBar />
      </Suspense>

      {/* Car list — key forces re-render + new backend fetch when params change */}
      <Suspense key={listKey} fallback={<CarListSkeleton />}>
        <CarList search={search} type={type} available={available} />
      </Suspense>
    </div>
  );
};

export default ExploreCars;
