"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="bg-red-600 text-white px-4 rounded-md py-1 "
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
