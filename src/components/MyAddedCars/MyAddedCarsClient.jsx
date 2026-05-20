"use client";
import MyCarCard from "./MyCarCard";
import EmptyMyCars from "./EmptyMyCars";

const MyAddedCarsClient = ({ cars, stats }) => {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 md:px-16 py-16">
      <div className="max-w-[1280px] mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#e6c364] mb-2">
            Fleet Management
          </p>
          <h1
            className="text-4xl md:text-5xl text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Added Cars
          </h1>
          <div className="h-px bg-gradient-to-r from-[#e6c364]/40 to-transparent mt-6" />
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#12121A] border border-[#e6c364]/10 p-6 rounded-sm hover:border-[#e6c364]/25 transition-colors duration-300"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-3">
                {stat.label}
              </p>
              <p
                className="text-3xl text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
              <p className={`text-[10px] tracking-wider ${stat.subColor}`}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Cars Grid ── */}
        {cars?.length === 0 ? (
          <EmptyMyCars />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <MyCarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyAddedCarsClient;