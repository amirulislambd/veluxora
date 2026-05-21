import React from "react";
import NavLinks from "./NavLinks";
import NavbarWrapper from "./NavbarWrapper";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@heroui/react";
import UserMenu from "./UserMenu";
import NavbarMenu from "./NavbarMenu";

const Navbar = async () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Explore Car", path: "/exploreCars" },
    { name: "Add Car", path: "/addCar" },
    { name: "My Bookings", path: "/myBookings" },
  ];

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <NavbarWrapper user={user}>
      <div>
        <div className="flex justify-between items-center p-4 container mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex md:hidden">
              <NavbarMenu user={user} />
            </div>
            <div>
              <Link href="/">
                <h1 className="uppercase text-2xl text-[#C9A84C] font-bold lg:font-extrabold">
                  Ve<span className="text-white">lux</span>ora
                </h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex gap-2 lg:gap-4">
            {links.map((link) => (
              <NavLinks key={link.name} link={link.path}>
                {link.name}
              </NavLinks>
            ))}
          </div>

          <div>
            {user ? (
              <div>
                <UserMenu user={user} />
              </div>
            ) : (
              <Link href="/login">
                <Button
                  className={
                    "bg-[#C9A84C] text-gray-800 font-bold  uppercase rounded-md"
                  }
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
