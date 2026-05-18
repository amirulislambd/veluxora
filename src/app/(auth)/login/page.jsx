"use client";
import Image from "next/image";
import steeringWheel from "@/assets/steeringWheel2.png";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    const { email, password } = data;
    const { data: userData, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL:'/'
    });
    if (error) return toast.error(error.message || "Login failed!");
    if (userData) {
      toast.success("Login successful!");
      console.log(userData);
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-10 bg-[#0A0A0F]/80 border border-[#C9A84C]/20  p-5 md:p-10 rounded-md shadow-[0_0_16px_rgba(201,168,76,0.25)]">
        {/* IMAGE */}
        <div className="hidden md:flex  relative overflow-hidden w-[ 450px]">
          {/* Image */}
          <Image
            width={450}
            height={350}
            src={steeringWheel}
            alt="Luxury steering wheel"
            className="object-cover object-center"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-[#0A0A0F]/10" />

          {/* Bottom Text */}
          <div className="absolute bottom-9 left-9 right-9">
            <h2 className="text-white text-3xl font-semibold italic mb-2">
              The Cockpit of Excellence
            </h2>
            <p className="text-white/50 text-sm font-light">
              Every detail crafted for the discerning driver.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="w-full max-w-[380px]">
          <h1
            className="text-[#e4e1e9] text-[32px] font-semibold italic mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome Back
          </h1>
          <p className="text-white/40 text-sm font-light mb-8">
            Enter the inner circle of automotive excellence.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[11px]">
                  {errors.email.message}
                </p>
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
                    errors.password
                      ? "border-red-500/50"
                      : "border-yellow-600/20"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUppercase: (v) =>
                        /[A-Z]/.test(v) ||
                        "Must contain at least 1 uppercase letter",
                      hasSpecialChar: (v) =>
                        /[!@#$%^&*]/.test(v) ||
                        "Must contain at least 1 special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-sm" />
                  ) : (
                    <FiEye className="text-sm" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px]">
                  {errors.password.message}
                </p>
              )}
              <p className="text-white/40 text-[10px] leading-relaxed">
                Min. 6 characters, 1 uppercase letter & 1 special character
                (!@#$%^&*)
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="relative overflow-hidden w-full bg-[#e6c364] cursor-pointer text-[#241a00] rounded-full py-3 text-xs font-bold tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.98] transition-all mt-1 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full
              before:bg-gradient-to-r before:from-transparent 
              before:via-yellow-700/20 before:to-transparent
              hover:before:left-[100%] before:transition-all before:duration-500"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] text-white/25 tracking-widest">
                OR
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="relative w-full cursor-pointer flex items-center justify-center gap-2.5 border border-white/30 rounded-full py-2.5 text-[11px] font-medium tracking-wide text-white/60 overflow-hidden hover:border-yellow-600/30 hover:bg-white/[0.03] transition-all before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full
              before:bg-gradient-to-r before:from-transparent 
              before:via-yellow-700/20 before:to-transparent
              hover:before:left-[100%] before:transition-all before:duration-500"
            >
              <FcGoogle className="text-base" />
              Continue with Google
            </button>

            {/* Register */}
            <p className="text-center text-xs text-white/35">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-[#e6c364] font-medium hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
