import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-5 py-2 rounded-lg">
            Login
          </button>
          <div className="bg-red-500 px-2 text-white w-fit rounded-md text-sm py-1 px-3 mt-2">
            Error Message
          </div>
          <Link
            href={"/register"}
            className="text-sm text-right cursor-pointer mt-3"
          >
            Don't have an account?<span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
