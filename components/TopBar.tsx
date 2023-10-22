import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TopBar = () => {
  return (
    <nav className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10;">
      <Link href={"/"} className="flex items-center gap-4">
        <Image src={"/vercel.svg"} alt="logo" width={28} height={28} />
        <p className="text-lg font-bold max-xs:hidden">Police</p>
      </Link>
      signout lbutton later add
    </nav>
  );
};
