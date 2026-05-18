import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import React from "react";

const LogoutBTN = async() => {

const handleLOGOUT = async () => {
    await authClient.logout();
};

  return (
    <div onClick={handleLOGOUT} className="w-full flex items-center justify-center gap-2 border border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 rounded-full py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#C9A84C] hover:text-white transition-all duration-300 cursor-pointer active:scale-[0.98]">
      <ArrowRightFromSquare className="size-3 sm:size-3.5 shrink-0" />
      <span>LOGOUT</span>
    </div>
  );
};

export default LogoutBTN;
