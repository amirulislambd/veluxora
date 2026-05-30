import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | VELUXORA",
  description: "This page could not be found. Explore the Veluxora premium fleet.",
  robots: { index: false, follow: false },
};

const NotFound = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]">

      {/* ── Background Car Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6GdRObXZ1KCor2MniKMKZyRVMu9y4BjKT8Lzz5NCGtP3RJbSqfbfwfWO6nyV0DPDw8zgi0iCT_XwEapYMnjxFHWjeAZoj0Nji8K6YAYhO5X1j75MPUies0ptfRFoqwh8ny_E38G0hCHdF1Y6fRdCwPC0mgXQibY0WJSckfTtycYarUJrE6fiQplo078EHYRkbC-HCCSAzu0pm9SnavErdkaD9Oxw0aMaFPtr_m6xmmPR7qhtg814fCU9Mq0XT-uIwdJk1GlR3UE"
          alt="404 car"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        {/* Top dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/80 via-transparent to-[#0A0A0F]/80" />
        {/* Left right dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/40 via-transparent to-[#0A0A0F]/40" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 404 */}
        <h1
          className="text-[140px] sm:text-[180px] md:text-[220px] leading-none font-bold text-[#e6c364]"
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: "0 0 80px rgba(230,195,100,0.3)",
          }}
        >
          404
        </h1>

        {/* Wrong Turn */}
        <p className="text-[11px] tracking-[0.4em] uppercase text-[#e6c364] mb-4 -mt-4">
          Wrong Turn
        </p>

        {/* Description */}
        <p className="text-sm text-[#d0c5b2] max-w-sm leading-relaxed mb-10">
          The path you've chosen doesn't exist in our collection. Let us guide you back to the apex of luxury.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/" className="btn-gold px-8 py-3 rounded-full text-[11px]">
            Return to Fleet
          </Link>
          <Link
            href="/exploreCars"
            className="btn-ghost px-8 py-3 rounded-full text-[11px]"
          >
            Explore Fleet
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;