import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-32 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto relative overflow-hidden rounded-3xl h-[400px] flex items-center justify-center text-center">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOyfE87mS9A78wUR-WN54K_D1SU8arv35Eq3T1JC6gIwEGpm5J9AEgZ2XmkPKljM22NTUZHS-Mw74pUkPRtv7hvf4lCM2jIjR-JiNqS5m2R_0lBlm2xPdemXplstrdNxwsT3oktNaSKa_kTQkdp3SDEVvueDWgaNPg0c9w1t4kh9Uj1u0L2PaZ-mBp97hFO5VJCCPYFwy7oYqw9QzvJJZo2H3xUit28zQOAKk9Rru5H84Pze2g26YSF_jLHJl7EbVg93AzG2UHA00"
          alt="Coastal Drive"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 space-y-8">
          <h2
            className="text-[48px] font-semibold leading-tight text-white max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Road is Calling. Answer in Style.
          </h2>
          <Link
            href="/exploreCars"
            className="inline-block bg-[#e6c364] text-[#3d2e00] text-[11px] font-bold tracking-[0.3em] uppercase px-12 py-5 rounded-full hover:scale-105 transition-all"
          >
            Reserve Your Dates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;