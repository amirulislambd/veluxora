"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-6 text-center">
      {/* Warning Triangle Icon */}
      <div className="mb-6">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 6L58 54H6L32 6Z"
            stroke="#c9a84c"
            strokeWidth="3"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M32 26V38"
            stroke="#c9a84c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="32" cy="45" r="2" fill="#c9a84c" />
        </svg>
      </div>

      {/* Label */}
      <p className="text-[#c9a84c] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
        An Unexpected Obstacle
      </p>

      {/* Heading */}
      <h1
        className="text-[#c9a84c] font-serif font-bold leading-none uppercase mb-6"
        style={{
          fontSize: "clamp(3rem, 10vw, 5rem)",
          letterSpacing: "-0.02em",
        }}
      >
        System
        <br />
        Stall
      </h1>

      {/* Description */}
      <p className="text-[#888] text-sm leading-relaxed max-w-sm mb-10">
        Our engineers are currently fine-tuning the system. Please stand by or
        return to your collection while we resolve the issue.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset?.()}
          className="bg-[#c9a84c] hover:bg-[#e0bc6a] text-[#141414] text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full transition-colors duration-200"
        >
          Reload Experience
        </button>
        <button
          onClick={() => router.push("/exploreCars")}
          className="bg-transparent border border-[#c9a84c] hover:bg-[#c9a84c]/10 text-[#c9a84c] text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full transition-colors duration-200"
        >
          Return to Fleet
        </button>
      </div>
    </div>
  );
}
