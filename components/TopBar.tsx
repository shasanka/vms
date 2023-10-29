"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { Siren } from "lucide-react";

export const TopBar = () => {
  const { status } = useSession();
  return (
    // <nav classNameNameName="bg-zinc-900 py-2 fixed inset-x-0 ">
    //   <div classNameName="flex justify-between mx-auto w-4/5">
    //     <Link href={"/"} classNameName="flex items-center gap-4">
    //       <Siren color="white" />
    //       <p classNameName="invisible text-lg font-bold sm:visible text-white">
    //         Police
    //       </p>
    //     </Link>
    //     {status === "authenticated" && <LogoutButton />}
    //   </div>
    // </nav>

    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div className="flex justify-between w-full">
            <Link href="/home" className="flex ml-2 md:mr-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Assam Police
              </span>
            </Link>
            {status === "authenticated" && <LogoutButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};
