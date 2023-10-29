import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen ">
      <aside
        className=" pt-12 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users />
                <span className="ml-3">View visitors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/visitor"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users />
                <span className="ml-3">Add visitors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/entry"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <UserPlus />
                <span className="ml-3">Add Entry</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="w-full flex justify-center items-center">{children}</div>
    </div>
  );
};
export default PrivateLayout;
