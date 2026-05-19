"use client";
import { ArrowRightFromSquare, Car } from "@gravity-ui/icons";
import { Avatar, Dropdown } from "@heroui/react";
import { FaCalendar } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";


const menuItems = [
  {
    id: "add-car",
    label: "ADD CAR",
    icon: <Car className="text-sm" />,
    href: "/addCar",
  },
  {
    id: "my-bookings",
    label: "MY BOOKINGS",
    icon: <FaCalendar className="text-sm" />,
    href: "/myBookings",
  },
  {
    id: "my-added-cars",
    label: "MY ADDED CARS",
    icon: <FiList className="text-sm" />,
    href: "/myAddedCars",
  },
];

const UserMenu = ({ user }) => {
  const { image, name, email } = user || {};
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : "U";
  const pathname = usePathname();

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <Dropdown
      placement="bottom-end"
      classNames={{ content: "!origin-top-right" }}
    >
      {/* Trigger */}
      <Dropdown.Trigger className="rounded-full cursor-pointer outline-none">
        <div className="p-[2px] rounded-full border border-[#C9A84C]/40 bg-[#16161D] hover:border-[#C9A84C] transition-all duration-300">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border border-black/50">
            <Avatar.Image alt={name} src={image} className="object-cover" />
            <Avatar.Fallback className="bg-[#242430] text-[#C9A84C] font-semibold text-sm sm:text-base">
              {fallbackLetter}
            </Avatar.Fallback>
          </Avatar>
        </div>
      </Dropdown.Trigger>

      {/* Popover */}
      <Dropdown.Popover className="bg-[#0D0D12] border border-[#C9A84C]/20 rounded-[20px] md:rounded-[28px] w-[85vw] sm:w-[300px] md:w-[320px] p-3 md:p-6 text-[#e4e1e9] shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
        {/* User Info */}
        <div className="flex flex-col items-center text-center mt-1 mb-4 sm:mt-2 sm:mb-5">
          <div className="p-1 rounded-full border-2 border-[#C9A84C]/40 mb-2 sm:mb-3 bg-[#16161D]">
            <Avatar className="w-10 h-10 md:w-16 md:h-16">
              <Avatar.Image alt={name} src={image} className="object-cover" />
              <Avatar.Fallback className="bg-[#242430] text-[#C9A84C] text-lg sm:text-xl font-semibold">
                {fallbackLetter}
              </Avatar.Fallback>
            </Avatar>
          </div>
          <h2
            className="text-sm text-yellow-500 md:text-2xl font-semibold tracking-wide mb-1 truncate w-full px-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {name || "User Name"}
          </h2>
          <p className="text-[8px] md:text-[11px] text-white/80 font-light tracking-[0.1em] uppercase break-all px-2">
            {email || "user@veluxora.com"}
          </p>
        </div>

        <Dropdown.Menu className="flex flex-col gap-2 p-0 w-full">
          {/* Theme Toggle */}
          <Dropdown.Item
            id="theme"
            textValue="Theme"
            className="w-full p-0 bg-transparent hover:bg-transparent focus:bg-transparent"
          >
            <ThemeToggle />
          </Dropdown.Item>

          {/* Divider */}
          <Dropdown.Item
            id="divider"
            textValue="divider"
            className="!p-0 !min-h-0 !h-auto bg-transparent hover:bg-transparent focus:bg-transparent"
          >
            <div className="h-px w-full bg-white/[0.06]" />
          </Dropdown.Item>

          {/* Menu Items with active highlight */}
          {menuItems.map(({ id, label, icon, href }) => {
            const isActive = pathname === href;
            return (
              <Dropdown.Item
                key={id}
                id={id}
                textValue={label}
                className="w-full p-0 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                <Link href={href} className="block w-full">
                  <div
                    className={`flex items-center justify-between w-full rounded-[12px] sm:rounded-[16px] px-3 md:px-4 py-1.5 transition-all duration-300 group cursor-pointer border ${
                      isActive
                        ? "bg-[#C9A84C]/10 border-[#C9A84C]/50"
                        : "bg-[#14141B] border-white/[0.03] hover:border-[#C9A84C]/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`p-1 md:p-2 rounded-full border shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]"
                            : "bg-white/[0.04] border-white/[0.05] text-[#C9A84C]"
                        }`}
                      >
                        {icon}
                      </div>
                      <span
                        className={`text-[7px] md:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-colors ${
                          isActive
                            ? "text-[#C9A84C]"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    <span
                      className={`transition-all text-xs shrink-0 ${
                        isActive
                          ? "text-[#C9A84C]"
                          : "text-white/20 group-hover:text-[#C9A84C] group-hover:translate-x-0.5"
                      }`}
                    >
                      ➔
                    </span>
                  </div>
                </Link>
              </Dropdown.Item>
            );
          })}

          {/* Logout */}
          <Dropdown.Item
            id="logout"
            textValue="Logout"
            className="w-full p-0 mt-2 md:mt-3 bg-transparent hover:bg-transparent focus:bg-transparent"
          >
            <div
              onClick={handleLogOut}
              className="w-full flex items-center justify-center gap-2 border border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 rounded-full py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#C9A84C] hover:text-white transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <ArrowRightFromSquare className="size-3 sm:size-3.5 shrink-0" />
              <span>LOGOUT</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default UserMenu;