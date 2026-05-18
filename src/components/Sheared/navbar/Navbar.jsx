import React from "react";
import NavLinks from "./NavLinks";
import User from "./User";
import NavbarWrapper from "./NavbarWrapper";
import Link from "next/link";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Explore Car", path: "/exploreCar" },
    { name: "Add Car", path: "/addCar" },
    { name: "My Bookings", path: "/myBookings" },
  ];

  return (
    <NavbarWrapper>
      <div>
        <div className="flex justify-between items-center p-4 container mx-auto">
          <div>
            <Link href="/">
              <h1 className="uppercase text-2xl text-yellow-600">
                Ve<span className="text-white">lux</span>ora
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex gap-2 lg:gap-4">
            {links.map((link) => (
              <NavLinks key={link.name} link={link.path}>
                {link.name}
              </NavLinks>
            ))}
          </div>

          <div>
            <User />
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
