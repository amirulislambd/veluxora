"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ link, children }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={`nav-link ${isActive ? "nav-link-active" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLinks;