"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const CancelBookingBtn = ({ bookingId, carName, variant = "desktop" }) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`,
        { method: "DELETE"}
      );
      const data = await res.json();
      if (data?.deletedCount > 0) {
        toast.success("Booking cancelled!");
        setConfirmOpen(false);
        router.refresh();
      } else {
        toast.error("Something went wrong!");
      }
    } catch {
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {variant === "mobile" ? (
        // Mobile — full width
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center justify-center gap-2 py-3 bg-[#2a1010] border border-[#f87171]/20 rounded-sm text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f87171]"
        >
          <FiTrash2 size={14} />
          Cancel
        </button>
      ) : (
        // Desktop — compact
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2a1010] border border-[#f87171]/20 rounded-sm text-[10px] font-semibold tracking-[0.2em] uppercase text-[#f87171] hover:border-[#f87171]/60 transition-colors"
        >
          <FiTrash2 size={13} />
          Cancel
        </button>
      )}

      {/* ── Confirm Modal ── */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative z-10 bg-[#12121A] border border-[#f87171]/20 w-full max-w-sm p-8 rounded-sm space-y-6">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#f87171]/10 border border-[#f87171]/20 flex items-center justify-center mx-auto">
              <FiTrash2 className="text-[#f87171]" size={20} />
            </div>

            {/* Text */}
            <div className="text-center">
              <h3
                className="text-xl text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Cancel Booking?
              </h3>
              <p className="text-[#6B6B7A] text-sm leading-relaxed">
                Are you sure you want to cancel{" "}
                <span className="text-[#e4e1e9]">{carName}</span>? This action
                cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 py-3 border border-[#4d4637] text-[#d0c5b2] text-[11px] tracking-[0.2em] uppercase hover:border-[#e6c364]/50 transition-colors rounded-sm"
              >
                Keep It
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className={`flex-1 py-3 text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all
                  ${
                    loading
                      ? "bg-[#4d4637] text-[#888] cursor-not-allowed"
                      : "bg-[#f87171] text-white hover:brightness-110 active:scale-95"
                  }`}
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelBookingBtn;