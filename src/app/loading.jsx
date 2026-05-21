// components/Sheared/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center gap-6">

      {/* Spinner */}
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[#e6c364]/10" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-t border-r border-[#e6c364] animate-spin" />
        {/* Inner dot */}
        <div className="absolute inset-[6px] rounded-full border border-[#e6c364]/20" />
        <div className="absolute inset-[6px] rounded-full border-t border-[#e6c364]/60 animate-spin"
          style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
        />
        {/* Center dot */}
        <div className="absolute inset-[28px] rounded-full bg-[#e6c364]" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <p
          className="text-lg text-white italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Veluxora
        </p>
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B6B7A]">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;