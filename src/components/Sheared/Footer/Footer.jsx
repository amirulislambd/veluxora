"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#161616] border-t border-[#2a2a2a] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3 items-center justify-center md:items-start md:justify-start">
          <h1 className="text-[#c9a84c] font-serif font-extrabold text-xl tracking-widest uppercase">
            VELUXORA
          </h1>
          <p className="text-[#666] text-xs leading-relaxed max-w-[180px] text-center md:text-left">
            Elevating the automotive experience through curation, care, and
            commitment to excellence.
          </p>
        </div>

        {/* Resources */}
        <div className="hidden md:block ">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#555] uppercase mb-4">
            Resources
          </p>
          <ul className="flex flex-col gap-3">
            {["Terms of Service", "Privacy Policy", "Insurance"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#aaa] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="hidden md:block">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#555] uppercase mb-4">
            Company
          </p>
          <ul className="flex flex-col gap-3">
            {["Careers", "Global Locations", "Member Perks"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#aaa] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#555] uppercase mb-4">
            Connect
          </p>
          <div className="flex gap-3 mb-6">
            {/* Globe icon */}
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] text-[#888] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5M1.5 8h13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            {/* Email icon */}
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-[#3a3a3a] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] text-[#888] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1.5"
                  y="3.5"
                  width="13"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M1.5 5l6.5 4.5L14.5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[#444] text-[11px] leading-relaxed flex">
            © 2024 Obsidian Drive. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}