"use client";
import { signOut } from "next-auth/react";

function UserInfo() {
  return (
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">Shasanka</span>
        </div>
        <div>
          Email: <span className="font-bold">test@gmail.com</span>
        </div>
        <button
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md cursor-pointer"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
