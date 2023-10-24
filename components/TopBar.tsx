"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import {Siren} from 'lucide-react';

export const TopBar = () => {
  const { status } = useSession();
  return (
    <nav className=" bg-zinc-900 py-2 fixed inset-x-0 ">
      <div className="flex justify-between mx-auto w-4/5">
        <Link href={"/"} className="flex items-center gap-4">
          <Siren color="white" />
          <p className="invisible text-lg font-bold sm:visible text-white">Police</p>
        </Link>
        {status === "authenticated" && <LogoutButton />}
      </div>
    </nav>
  );
};

