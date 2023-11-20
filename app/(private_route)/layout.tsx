"use client";
import LogoutButton from "@/components/LogoutButton";
import { DoorOpen, Menu, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { SnackbarProvider } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <button
                    onClick={toggleSidebar}
                    type="button"
                    className="inline-flex items-center p-2 text-sm 
                  text-gray-500 rounded-lg sm:hidden
                   hover:bg-gray-100 focus:outline-none 
                   focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Menu />
                  </button>
                  <Link href="/home" className="flex ml-2 md:mr-24">
                    <Image
                      height={20}
                      width={20}
                      src="https://flowbite.com/docs/images/logo.svg"
                      className="h-8 mr-3"
                      alt="FlowBite Logo"
                    />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                      Assam Police
                    </span>
                  </Link>
                </div>
                <LogoutButton />
              </div>
            </div>
          </nav>
          {/* <aside
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    href="/home"
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      pathname.startsWith("/home") && "bg-gray-700"
                    }`}
                  >
                    <Users className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                    <span className="ml-3">Visitors</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/entry"
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      pathname.startsWith("/entry") && "bg-gray-700"
                    }`}
                  >
                    <DoorOpen className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                    <span className="ml-3">Entry</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/qr"
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      pathname.startsWith("/qr") && "bg-gray-700"
                    }`}
                  >
                    <DoorOpen className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                    <span className="ml-3">QR</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside> */}
          {/* <div className="p-4 sm:ml-64"> */}
          <div className="p-4">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              {children}
            </div>
          </div>
        </LocalizationProvider>
      </SnackbarProvider>
    </>
  );
};
export default PrivateLayout;
