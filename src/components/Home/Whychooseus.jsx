import { FiShield, FiCheckCircle, FiZap } from "react-icons/fi";

const features = [
  {
    icon: <FiCheckCircle className="text-5xl" />,
    title: "White Glove Service",
    desc: "Personalized delivery and collection at your doorstep, airport, or hotel. Your convenience is our highest priority.",
    num: "01",
  },
  {
    icon: <FiShield className="text-5xl" />,
    title: "Premium Insurance",
    desc: "Comprehensive coverage plans tailored for exotic vehicles, giving you absolute peace of mind while on the road.",
    num: "02",
  },
  {
    icon: <FiZap className="text-5xl" />,
    title: "No Limit Freedom",
    desc: "Enjoy unlimited mileage options on selected models. Explore without boundaries and discover the joy of pure driving.",
    num: "03",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-[#0e0e13]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364] mb-4 block">
            THE VELUXORA ADVANTAGE
          </span>
          <h2
            className="text-[48px] font-semibold leading-tight tracking-tight text-[#e4e1e9] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Excellence in Every Detail
          </h2>
          <p className="text-base text-[#d0c5b2] leading-relaxed">
            We redefine the rental experience by offering more than just a car — we provide a lifestyle defined by luxury, convenience, and absolute performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc, num }) => (
            <div
              key={num}
              className="p-10 bg-[#131318] border border-[#4d4637]/30 rounded-xl space-y-6 hover:border-[#e6c364]/30 transition-colors duration-300"
            >
              <div className="text-[#e6c364]">{icon}</div>
              <h3
                className="text-2xl font-semibold text-[#e4e1e9]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </h3>
              <p className="text-base text-[#d0c5b2] leading-relaxed">{desc}</p>
              <div
                className="text-[64px] font-bold text-[#e6c364]/10 leading-none select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {num}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;