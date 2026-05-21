import { getCarById, getCars } from "@/lib/dataFecth";
import Image from "next/image";
import { FiMapPin, FiUsers, FiTag, FiZap } from "react-icons/fi";
import { GiSteeringWheel } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import BookingModal from "@/components/ExploreCars/BookingModal";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`);
    const car = await res.json();

    if (!car) return { title: "Vehicle Not Found | VELUXORA" };

    return {
      title: `${car.car_name} Rent in ${car.pickup_location} | VELUXORA`,
      description:
        car.description ||
        `Rent the high-performance ${car.car_name} on VELUXORA.`,
      openGraph: {
        title: `${car.car_name} — Premium Rental | VELUXORA`,
        description: `Rent this ${car.car_name} for $${car.daily_rent_price}/day.`,
        url: `https://veluxora.vercel.app/exploreCars/${id}`,
        siteName: "VELUXORA",
        images: [
          { url: car.image, width: 1200, height: 630, alt: car.car_name },
        ],
      },
    };
  } catch (error) {
    return { title: "Premium Luxury Fleet | VELUXORA" };
  }
}

const DetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`);
  const car = await res.json();
  // const res2 = await fetch("http://localhost:5000/bookings");
  // const bookings = await res2.json();

  const specs = [
    { icon: <FiUsers />, label: "Seats", value: car.seat_capacity },
    { icon: <FiTag />, label: "Type", value: car.car_type },
    { icon: <FiMapPin />, label: "Pickup", value: car.pickup_location },
    { icon: <BsFuelPump />, label: "Fuel", value: car.fuel_type || "Petrol" },
    {
      icon: <GiSteeringWheel />,
      label: "Transmission",
      value: car.transmission || "Automatic",
    },
    {
      icon: <FiZap />,
      label: "Bookings",
      value: `${car._id.length} times`,
    },
  ];

  return (
    <main className="max-w-7xl mx-6 md:mx-auto bg-[#0A0A0F]">
      {/* ── HERO IMAGE ── */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={car.image}
          alt={car.car_name}
          fill
          className="object-cover"
          priority
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/60 via-transparent to-transparent" />

        {/* availability badge */}
        <div className="absolute top-8 right-8">
          <span
            className={
              car.availability_status ? "badge-available" : "badge-unavailable"
            }
          >
            {car.availability_status ? "● Available" : "● Unavailable"}
          </span>
        </div>

        {/* car name over image */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12">
          <p className="text-[11px] tracking-[0.4em] text-[#e6c364] uppercase mb-3">
            {car.car_type}
          </p>
          <h1
            className="text-5xl md:text-7xl text-white font-bold italic leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {car.car_name}
          </h1>
          <p className="text-[#d0c5b2] mt-3 text-sm tracking-widest uppercase">
            <FiMapPin className="inline mr-1" />
            {car.pickup_location}
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── LEFT: Details ── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Specs Grid */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-[#e6c364]" />
                <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
                  Specifications
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[#12121A] border border-[#e6c364]/10 p-5 rounded-sm hover:border-[#e6c364]/30 transition-colors duration-300"
                  >
                    <div className="text-[#e6c364] text-xl mb-3">
                      {spec.icon}
                    </div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B7A] mb-1">
                      {spec.label}
                    </p>
                    <p className="text-[#e4e1e9] text-base font-medium">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-[#e6c364]" />
                <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
                  About This Vehicle
                </h2>
              </div>
              <p className="text-[#d0c5b2] leading-relaxed text-base">
                {car.description}
              </p>
            </div>

            {/* Features */}
            {car.features?.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-px w-12 bg-[#e6c364]" />
                  <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
                    Premium Features
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {car.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 border border-[#e6c364]/20 text-[#d0c5b2] text-xs tracking-widest uppercase hover:border-[#e6c364]/50 transition-colors duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Booking Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#12121A] border border-[#e6c364]/15 p-8 space-y-8">
              {/* Price */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B6B7A] mb-1">
                  Daily Rate
                </p>
                <div className="flex items-end gap-2">
                  <span
                    className="text-5xl font-bold text-[#e6c364]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ${car.daily_rent_price}
                  </span>
                  <span className="text-[#6B6B7A] text-sm mb-2">/day</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e6c364]/10" />

              {/* Info */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B7A]">Type</span>
                  <span className="text-[#e4e1e9]">{car.car_type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B7A]">Seats</span>
                  <span className="text-[#e4e1e9]">
                    {car.seat_capacity} Persons
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B7A]">Location</span>
                  <span className="text-[#e4e1e9]">{car.pickup_location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B7A]">Status</span>
                  <span
                    className={
                      car.availability_status
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {car.availability_status ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e6c364]/10" />

              <BookingModal car={car} />

              {/* Note */}
              <p className="text-[10px] text-[#6B6B7A] text-center tracking-wider leading-relaxed">
                Free cancellation up to 24 hours before pickup. No hidden
                charges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};;

export default DetailsPage;