"use client";
import { useState } from "react";
import { Bars } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const loggedInLinks = [
  { href: "/",                         label: "HOME"          },
  { href: "/exploreCars",             label: "EXPLORE CARS"  },
  { href: "/addCar",        label: "ADD CAR"       },
  { href: "/myBookings",    label: "MY BOOKINGS"   },
  { href: "myAddedCars",  label: "MY ADDED CARS" },
];

const loggedOutLinks = [
  { href: "/", label: "HOME" },
  { href: "/exploreCars", label: "EXPLORE CARS" },
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTER" },
];

const NavbarMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <div className="relative">

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-[2px] rounded-full border border-[#C9A84C]/40 bg-[#16161D] hover:border-[#C9A84C] transition-all duration-300 w-10 h-10 flex items-center justify-center"
      >
        <Bars className="size-4 text-[#C9A84C]" />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-12 z-50 bg-[#0D0D12] border border-[#C9A84C]/20 rounded-[20px] w-[200px] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex flex-col gap-1.5">

            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={`flex items-center justify-between w-full rounded-[12px] px-4 py-2 border transition-all duration-200 group ${
                      isActive
                        ? "bg-[#C9A84C]/10 border-[#C9A84C]/50"
                        : "bg-[#14141B] border-white/[0.03] hover:border-[#C9A84C]/40"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold tracking-[0.12em] transition-colors ${
                        isActive
                          ? "text-[#C9A84C]"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`text-xs transition-all ${
                        isActive
                          ? "text-[#C9A84C]"
                          : "text-white/20 group-hover:text-[#C9A84C] group-hover:translate-x-0.5"
                      }`}
                    >
                      ➔
                    </span>
                  </div>
                </Link>
              );
            })}

          </div>
        </>
      )}
    </div>
  );
};

export default NavbarMenu;