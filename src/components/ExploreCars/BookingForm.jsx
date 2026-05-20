"use client";
import toast from "react-hot-toast";

const BookingForm = ({
  car, dateRange, totalDays, totalPrice,
  driverNeeded, setDriverNeeded,
  note, setNote,
  loading, setLoading,
  onClose,
}) => {

  const handleBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select booking dates!");
      return;
    }
    setLoading(true);
    try {
      const bookingData = {
        car_id: car._id.toString(),
        car_name: car.car_name,
        car_image: car.image,
        car_type: car.car_type,
        daily_rent_price: car.daily_rent_price,
        pickup_location: car.pickup_location,
        driver_needed: driverNeeded,
        special_note: note,
        booking_date: dateRange.from,
        return_date: dateRange.to,
        total_days: totalDays,
        total_price: totalPrice,
        status: "Pending",
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (!res.ok) {
        toast.error("Booking failed! Please login first.");
        return;
      }

      const data = await res.json();
      if (data?.insertedId) {
        toast.success("Booking confirmed! 🚗");
        onClose();
        setNote("");
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
      {/* Driver Toggle */}
      <div className="flex items-center justify-between bg-[#1f1d2a] rounded-xl p-4">
        <div>
          <p className="text-sm font-medium text-[#e4e1e9]">Professional Driver Needed</p>
          <p className="text-[10px] text-[#6B6B7A] mt-0.5">Recommended for evening events</p>
        </div>
        <button
          type="button"
          onClick={() => setDriverNeeded(!driverNeeded)}
          className={`relative inline-flex h-7 rounded-full transition-colors duration-300 shrink-0
            ${driverNeeded ? "bg-[#e6c364]" : "bg-[#3a3848]"}`}
          style={{ width: "52px" }}
        >
          <span className={`absolute top-1 inline-block h-5 w-5 rounded-full shadow-md transition-transform duration-300
            ${driverNeeded ? "translate-x-[28px] bg-[#0A0A0F]" : "translate-x-1 bg-[#6B6B7A]"}`}
          />
        </button>
      </div>

      {/* Special Note */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] tracking-[0.3em] uppercase text-[#e6c364]">
          Special Requirements
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Specify dietary needs, preferred temperature, or itinerary details..."
          className="w-full bg-[#1f1d2a] rounded-xl p-4 text-sm text-[#e4e1e9] placeholder:text-[#3a3848] focus:outline-none focus:ring-1 focus:ring-[#e6c364]/30 transition-all resize-none"
        />
      </div>

      {/* Price Summary */}
      {dateRange?.from && dateRange?.to && (
        <div className="bg-[#1f1d2a] rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-[#6B6B7A]">
            <span>${car.daily_rent_price} × {totalDays} day{totalDays > 1 ? "s" : ""}</span>
            <span className="text-[#e4e1e9]">${totalPrice}</span>
          </div>
          {driverNeeded && (
            <div className="flex justify-between text-xs text-[#6B6B7A]">
              <span>Driver fee</span>
              <span className="text-[#e4e1e9]">Included</span>
            </div>
          )}
          <div className="h-px bg-[#e6c364]/10" />
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-[#e4e1e9]">Total</span>
            <span className="text-[#e6c364]">${totalPrice}</span>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleBooking}
        disabled={loading}
        className={`w-full py-4 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300
          ${loading
            ? "bg-[#4d4637] text-[#888] cursor-not-allowed"
            : "bg-[#e6c364] text-[#0A0A0F] hover:brightness-110 active:scale-[0.98] cursor-pointer"
          }`}
      >
        {loading ? "Confirming..." : "Confirm Booking"}
      </button>

      <p className="text-center text-[10px] text-[#6B6B7A] tracking-wider">
        Our concierge will contact you within 15 minutes.
      </p>
    </>
  );
};

export default BookingForm;