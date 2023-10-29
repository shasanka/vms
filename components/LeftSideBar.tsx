import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LeftSideBar = () => {
  return (
    // <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4  pb-5 pt-28 max-md:hidden;">
    //   <div className="flex w-full flex- flex-col gap-6 px-6">
    //     {sidebarLinks.map((link) => (
    //       <Link
    //         href={link.route}
    //         key={link.label}
    //         className="relative flex justify-start gap-4 rounded-lg p-4;"
    //       >
    //         <Image src={link.imgURL} alt={link.label} width={24} height={24} />
    //         <p className="text-light-1 max-lg:hidden">{link.label}</p>
    //       </Link>
    //     ))}
    //   </div>
    // </section>
    <h1>Sidebar</h1>
  );
};
