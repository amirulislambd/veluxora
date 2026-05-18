"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ link, children }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={`
        relative overflow-hidden px-6 py-2 rounded-md text-sm font-semibold
        tracking-wider border transition-all duration-300
        before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full
        before:bg-gradient-to-r before:from-transparent 
        before:via-yellow-700/20 before:to-transparent
        hover:before:left-[100%] before:transition-all before:duration-500
        ${isActive
          ? "bg-gradient-to-r from-yellow-700/25 to-yellow-700/10 border-yellow-700 text-yellow-600 shadow-[0_0_12px_rgba(201,168,76,0.3)] hover:bg-gray-500/10"
          : "bg-yellow-700/8 border-yellow-700/20 text-yellow-700 hover:bg-yellow-700/15 hover:shadow-[0_0_16px_rgba(201,168,76,0.25)] hover:text-yellow-500"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default NavLinks;