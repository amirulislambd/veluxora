"use client";

import { useEffect, useState } from "react";

const NavbarWrapper = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY > 20);

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${visible ? "translate-y-0" : "-translate-y-full"} ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#C9A84C]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {children}
    </nav>
  );
};

export default NavbarWrapper;
