"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/components/RegisterForm";

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = useState<Pick<IUser, "email" | "password">>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      console.log("🚀 ~ file: page.tsx:34 ~ handleSubmit ~ res:", res);

      if (res?.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/home");
    } catch (E) {
      console.log("Error in logging in:", E);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            // value={user.email}
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChange}
            required
          />
          <input
            // value={user.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required
          />
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold cursor-pointer px-5 py-2 rounded-lg">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit rounded-md text-sm py-1 px-3 mt-2">
              {error}
            </div>
          )}
          <Link
            href={"/register"}
            className="text-sm text-right cursor-pointer mt-3"
          >
            Dont have an account?<span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
