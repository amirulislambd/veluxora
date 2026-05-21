"use client";
import Image from "next/image";
import steeringWheel from "@/assets/steeringWheel.png";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiLink,
  FiLock,
  FiMail,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ResponseImgBb } from "@/lib/dataFecth";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [photoMode, setPhotoMode] = useState("url");

  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    let finalPhoto = "";
    try {
      if (photoMode === "file") {
        const photoAddress = data?.photoFile[0];
        if (!photoAddress) {
          return toast.error("Please select an image file to upload");
        }
        const imgBb = await ResponseImgBb(photoAddress);
        if (imgBb && imgBb.success) {
          finalPhoto = imgBb.data.display_url;
        } else {
          console.error("imgBb error:", imgBb);
          return toast.error("Image upload failed!");
        }
      } else {
        finalPhoto = data?.photoURL || "";
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return toast.error("Image upload failed!");
    }
    
    const { data: userData, error } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      image: finalPhoto,
    });
    if (error) return toast.error(error.message || "Registration failed!");
    if (userData) {
      toast.success("Registration successful!");
      await authClient.signOut();
      router.push("/login");
    }
  };

  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex gap-10 bg-[#0A0A0F]/80 border border-[#C9A84C]/20 p-5 md:p-10 rounded-md shadow-[0_0_16px_rgba(201,168,76,0.25)]">
        {/* IMAGE */}
        <div className="hidden md:flex relative overflow-hidden w-[450px]">
          <Image
            width={450}
            height={350}
            src={steeringWheel}
            alt="Luxury steering wheel"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#0A0A0F]/70" />
          <div className="absolute bottom-9 left-9 right-9">
            <h2
              className="text-white text-3xl font-semibold italic mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Begin Your Journey
            </h2>
            <p className="text-white/50 text-sm font-light">
              Step into a world where performance meets prestige.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="w-full max-w-[380px]">
          <h1
            className="text-[#e4e1e9] text-[32px] font-semibold italic mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create Account
          </h1>
          <p className="text-white/40 text-sm font-light mb-8">
            Enter the inner circle of automotive excellence.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-yellow-500/50">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  placeholder="Your full name"
                  className={`w-full bg-white/[0.04] border rounded-md pl-9 pr-4 py-2.5 text-[#e4e1e9] text-sm placeholder-white/20 outline-none focus:border-yellow-500/60 focus:bg-white/[0.07] transition-all duration-200 ${
                    errors.fullName ? "border-red-500/50" : "border-yellow-600/20"
                  }`}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-[11px]">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-yellow-500/50">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  type="email"
                  placeholder="Type your email address"
                  className={`lowercase w-full bg-white/[0.04] border rounded-md pl-9 pr-4 py-2.5 text-[#e4e1e9] text-sm placeholder-white/20 outline-none focus:border-yellow-500/60 focus:bg-white/[0.07] transition-all duration-200 ${
                    errors.email ? "border-red-500/50" : "border-yellow-600/20"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[11px]">{errors.email.message}</p>}
            </div>

            {/* Photo Mode */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-yellow-500/50">
                Profile Photo
              </label>
              <div className="flex gap-3">
                {[
                  { value: "url", label: "Photo URL" },
                  { value: "file", label: "Upload File" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPhotoMode(opt.value)}
                    className={`flex items-center justify-center gap-2.5 border rounded-full py-2.5 text-[11px] font-medium tracking-wide w-full cursor-pointer overflow-hidden transition-all duration-200 ${
                      photoMode === opt.value
                        ? "bg-[#e6c364]/10 border-[#e6c364]/60 text-[#e6c364]"
                        : "bg-white/[0.03] border-white/10 text-white/35 hover:border-white/20"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${photoMode === opt.value ? "border-[#e6c364]" : "border-white/25"}`}>
                      {photoMode === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-[#e6c364] block" />}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {photoMode === "url" && (
                <div className="relative">
                  <FiLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    placeholder="https://photo.url/..."
                    className={`w-full bg-white/[0.04] border rounded-md pl-9 pr-4 py-2.5 text-[#e4e1e9] text-sm placeholder-white/20 outline-none focus:border-yellow-500/60 focus:bg-white/[0.07] transition-all duration-200 ${
                      errors.photoURL ? "border-red-500/50" : "border-yellow-600/20"
                    }`}
                    {...register("photoURL", {
                      pattern: { value: /^https?:\/\/.+/, message: "Enter a valid URL starting with http:// or https://" },
                    })}
                  />
                  {errors.photoURL && <p className="text-red-400 text-[11px] mt-1">{errors.photoURL.message}</p>}
                </div>
              )}

              {photoMode === "file" && (
                <label className="relative flex items-center gap-3 bg-white/[0.04] border border-yellow-600/20 rounded-md px-4 py-2.5 cursor-pointer hover:border-yellow-500/60 hover:bg-white/[0.07] transition-all duration-200 group">
                  <FiUpload className="text-white/30 text-sm group-hover:text-white/50 transition-colors shrink-0" />
                  <span className="text-white/25 text-sm truncate" id="file-label">Choose a file...</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...register("photoFile")}
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name;
                      const el = document.getElementById("file-label");
                      if (el) el.textContent = name || "Choose a file...";
                    }}
                  />
                </label>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-yellow-500/50">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-white/[0.04] border rounded-md pl-9 pr-10 py-2.5 text-[#e4e1e9] text-sm placeholder-white/20 outline-none focus:border-yellow-500/60 focus:bg-white/[0.07] transition-all duration-200 ${
                    errors.password ? "border-red-500/50" : "border-yellow-600/20"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    validate: {
                      hasUppercase: (v) => /[A-Z]/.test(v) || "Must contain at least 1 uppercase letter",
                      hasSpecialChar: (v) => /[!@#$%^&*]/.test(v) || "Must contain at least 1 special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[11px]">{errors.password.message}</p>}
              <p className="text-white/40 text-[10px] leading-relaxed">
                Min. 6 characters, 1 uppercase letter & 1 special character (!@#$%^&*)
              </p>
            </div>

            {/* Submit */}
            <button type="submit" className="relative overflow-hidden w-full bg-[#e6c364] cursor-pointer text-[#241a00] rounded-full py-3 text-xs font-bold tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.98] transition-all mt-1">
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] text-white tracking-widest">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Button */}
            <button onClick={googleSignIn} type="button" className="relative w-full cursor-pointer flex items-center justify-center gap-2.5 border border-white/30 rounded-full py-2.5 text-[11px] font-medium tracking-wide text-white/60 hover:bg-white/[0.03] transition-all">
              <FcGoogle className="text-base" />
              Continue with Google
            </button>

            {/* Sign In Link */}
            <p className="text-center text-xs text-white/35">
              Already have an account?{" "}
              <a href="/login" className="text-[#e6c364] font-medium hover:underline">LogIn</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;