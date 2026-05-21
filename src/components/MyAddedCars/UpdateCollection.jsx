"use client";
import { ResponseImgBb } from "@/lib/dataFecth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

const labelClass =
  "text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]";

const inputClass = `
  w-full bg-transparent border-0 border-b border-[#4d4637] py-3 px-0
  text-[24px] text-[#e4e1e9] placeholder:text-[#35343a]
  focus:outline-none focus:border-[#e6c364] transition-colors duration-300
`;

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-4 mb-2">
    <span className="h-px w-12 bg-[#e6c364]" />
    <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#e6c364]">
      {title}
    </h2>
  </div>
);

const UpdateCollection = ({ user }) => {
  const {image,car_name,car_type,daily_rent_price,seat_capacity,pickup_location,description,_id } = user;

const router = useRouter();

  const [availability, setAvailability] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let uploadImg = data?.imageURL || "";

      if (data?.photoFile?.[0]) {
        const resImgBb = await ResponseImgBb(data.photoFile[0]);
        if (!resImgBb?.success) {
          toast.error("Image upload failed!");
          return;
        }
        uploadImg = resImgBb.data.display_url;
      }

      if (!uploadImg) {
        toast.error("Please provide an image!");
        return;
      }

      const carData = {
        car_name: data.carName,
        car_type: data.carType,
        daily_rent_price: Number(data.dailyRent),
        seat_capacity: Number(data.seatCapacity),
        pickup_location: data.location,
        description: data.description,
        image: uploadImg,
        availability_status: availability,
        // booking_count: 0,
        created_at: new Date(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        },
      );

      if (!res.ok) {
        toast.error("Something went wrong!");
        return;
      }

      const responseData = await res.json();

      if (responseData?.modifiedCount > 0) {
        toast.success("Car updated successfully!");
        reset();
        router.refresh();
        router.push(`http://localhost:3000/exploreCars/${_id}`);
        setPreviewImg(null);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-6">
        {/* ── LEFT: Image Upload ── */}
        <div className="col-span-12 lg:col-span-5">
          <div className="sticky top-24">
            {/* Main Dropzone */}
            <label className="relative aspect-[3/4] w-full bg-[#1f1f25] border border-[#4d4637]/50 flex flex-col items-center justify-center group cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#e6c364]/50 block">
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500" >
                    <Image src={image} alt="bg" fill />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center text-center p-12">
                <FiUpload
                  className="text-[#e6c364] mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontSize: "48px" }}
                />
                <h3
                  className="text-2xl text-[#e4e1e9] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Drop your masterpiece here
                </h3>
                <p className="text-[10px] tracking-widest text-[#d0c5b2] uppercase">
                  Recommended: 4K horizontal shots in low-key lighting
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e6c364] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("photoFile")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreviewImg(URL.createObjectURL(file));
                }}
              />
            </label>

            {/* Thumbnail Slots */}
            <div className="mt-4 flex gap-3">
              {["REAR 3/4", "INTERIOR", "DETAIL"].map((lbl) => (
                <div
                  key={lbl}
                  className="h-20 flex-1 bg-[#1f1f25] border border-[#4d4637]/50 flex items-center justify-center cursor-pointer hover:border-[#e6c364] transition-colors duration-300"
                >
                  <span className="text-[9px] tracking-widest text-[#d0c5b2] uppercase">
                    {lbl}
                  </span>
                </div>
              ))}
            </div>

            {/* Image URL fallback */}
            <div className="mt-6 flex flex-col gap-1.5">
              <label className={labelClass}>Or paste image URL</label>
              <div className="border-b border-[#4d4637] focus-within:border-[#e6c364] transition-colors">
                <input
                  placeholder="https://imgbb.com/..."
                  className="w-full bg-transparent py-3 text-sm text-[#e4e1e9] placeholder:text-[#35343a] outline-none"
                  {...register("imageURL")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form Fields ── */}
        <div className="col-span-12 lg:col-span-7 space-y-10">
          {/* Vehicle Identity */}
          <section className="glass-panel p-8 md:p-12 space-y-10">
            <SectionHeader title="Vehicle Identity" />
            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Car Name</label>
                <input
                defaultValue={car_name}
                  className={inputClass}
                  placeholder="e.g. Aston Martin DBS"
                  {...register("carName", { required: "Car name is required" })}
                />
                {errors.carName && (
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    {errors.carName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                className={labelClass}>Car Type</label>
                <select   
                defaultValue={car_type }
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{ fontSize: "18px" }}
                  {...register("carType", { required: "Car type is required" })}
                >
                  <option value="" disabled className="bg-[#131318]">
                    Select type
                  </option>
                  {[
                    "SUV",
                    "Sedan",
                    "Hatchback",
                    "Luxury",
                    "Convertible",
                    "Sports",
                  ].map((t) => (
                    <option key={t} value={t} className="bg-[#131318]">
                      {t}
                    </option>
                  ))}
                </select>
                {errors.carType && (
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    {errors.carType.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Seat Capacity</label>
                <input
                defaultValue={seat_capacity}
                  type="number"
                  className={inputClass}
                  placeholder="e.g. 4"
                  {...register("seatCapacity", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                  })}
                />
                {errors.seatCapacity && (
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    {errors.seatCapacity.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Pickup Location</label>
                <input
                defaultValue={pickup_location}
                  className={inputClass}
                  placeholder="e.g. Beverly Hills, CA"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Pricing & Availability */}
          <section className="glass-panel p-8 md:p-12 space-y-10">
            <SectionHeader title="The Offering" />
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Daily Rent Price</label>
                <div className="flex items-end gap-2 border-b border-[#4d4637] focus-within:border-[#e6c364] transition-colors">
                  <span
                    className="text-2xl text-[#e6c364] pb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    $
                  </span>
                  <input
                  defaultValue={daily_rent_price}
                    type="number"
                    className="bg-transparent border-0 py-3 px-0 text-2xl text-[#e4e1e9] placeholder:text-[#35343a] w-full outline-none"
                    placeholder="1,200"
                    {...register("dailyRent", {
                      required: "Price is required",
                      min: { value: 1, message: "Must be > 0" },
                    })}
                  />
                </div>
                {errors.dailyRent && (
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    {errors.dailyRent.message}
                  </p>
                )}
              </div>

              {/* Availability Toggle */}
              <div className="flex flex-col justify-end pb-2">
                <div className="flex items-center justify-between p-5 bg-[#1f1f25]/50 border border-[#4d4637]/30">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-[#e4e1e9]">
                      Availability Status
                    </span>
                    <span className="text-[10px] text-[#d0c5b2] uppercase tracking-wider">
                      {availability
                        ? "Available for booking"
                        : "Currently unavailable"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAvailability(!availability)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ${
                      availability ? "bg-[#e6c364]" : "bg-[#4d4637]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#131318] shadow transition-transform duration-300 ${
                        availability ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Description</label>
              <textarea
                defaultValue={description}
                className="bg-[#1f1f25]/30 border border-[#4d4637]/30 p-6 text-base text-[#e4e1e9] placeholder:text-[#35343a] focus:outline-none focus:border-[#e6c364] transition-all resize-none leading-relaxed"
                placeholder="Describe the machine's soul..."
                rows={5}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p style={{ color: "#f87171", fontSize: "11px" }}>
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>

          {/* Actions */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-6 pt-4">
  
  {/* Cancel */}
  <Link
    href="/myAddedCars"
    className="flex items-center justify-center px-6 py-3 border border-[#4d4637] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d0c5b2] hover:border-[#e6c364]/50 hover:text-[#e6c364] transition-all duration-300 rounded-sm"
  >
    Cancel
  </Link>

  {/* Reset */}
  <button
    type="button"
    onClick={() => { reset(); setPreviewImg(null); }}
    className="flex items-center justify-center px-6 py-3 border border-[#4d4637] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d0c5b2] hover:border-[#e6c364]/50 hover:text-[#e6c364] transition-all duration-300 rounded-sm"
  >
    Reset
  </button>

  {/* Submit */}
  <button
    type="submit"
    disabled={loading}
    className={`flex items-center justify-center px-10 py-3 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 rounded-sm
      ${loading
        ? "bg-[#4d4637] text-[#888] cursor-not-allowed"
        : "bg-[#e6c364] text-[#3d2e00] hover:brightness-110 active:scale-95 cursor-pointer"
      }`}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 border border-[#888] border-t-transparent rounded-full animate-spin" />
        Updating...
      </span>
    ) : "Save Changes"}
  </button>
</div>
        </div>
      </div>
    </form>
  );
};

export default UpdateCollection;